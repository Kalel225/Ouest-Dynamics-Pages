import express from 'express';
import { JSONFilePreset } from 'lowdb/node';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface SubmissionRecord {
  id: string;
  reference: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  selectedPoles: string[];
  selectedModifiers: string[];
  urgency: string;
  currency: string;
  estimatedRange: string;
  summary: string;
  consentTimestamp: string;
  createdAt: string;
  status: 'received' | 'reviewing' | 'contacted';
}

export interface DatabaseSchema {
  submissions: SubmissionRecord[];
  analytics: {
    totalRequests: number;
    lastRequestAt: string | null;
  };
}

const defaultData: DatabaseSchema = {
  submissions: [],
  analytics: {
    totalRequests: 0,
    lastRequestAt: null,
  },
};

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbFilePath = path.join(dataDir, 'database.json');

const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 12;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitStore.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, timestamps);
    return false;
  }
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return true;
}

function getGenAIClient(): GoogleGenAI {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System instruction & schema aligned with /ai-studio-manifest.json
const CONCIERGE_SYSTEM_INSTRUCTION =
  "Tu es le Concierge Exécutif d'Ouest Dynamics, agence digitale et d'ingénierie IA 360° basée à Abidjan (Côte d'Ivoire) et opérant à l'international. Ton rôle est de diagnostiquer le besoin d'un prospect en 2 à 3 échanges maximum et de cartographier son projet sur nos 4 Pôles (BRANDING: identité visuelle/Brand Book, WEB: sites/e-commerce/SaaS, MOBILE_DESKTOP: apps iOS/Android/Desktop Offline-First, GROWTH: Paid Ads/SEO-GEO/CAPI) et nos 2 Moteurs Transverses (TRANSVERSE_DA: Direction Artistique Executive, TRANSVERSE_AI: Agents IA Gemini & automatisations n8n). RÈGLES STRICTES : 1. Ne jamais inventer de remises commerciales, de délais fermes non validés ou d'engagements juridiques. 2. Mentionner que les estimations chiffrées officielles sont calculées dans le Configurateur de Brief avec propriété intégrale des actifs par le client et politique Zero-Data Retention (ARTCI/RGPD). 3. Répondre toujours dans la langue du prospect (FR par défaut, EN si le prospect écrit en anglais). 4. Dès qu'un pôle et un objectif métier sont identifiés, passer qualification_complete à true et fournir une synthèse claire dans synthesized_project_summary.";

const CONCIERGE_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  required: [
    'reply_message',
    'detected_language',
    'qualification_complete',
    'recommended_poles',
    'recommended_modifiers',
    'urgency_tier',
    'suggested_currency',
    'synthesized_project_summary',
    'next_follow_up_question',
  ],
  properties: {
    reply_message: {
      type: Type.STRING,
      description:
        'Réponse concise, experte et courtoise adressée au prospect dans sa langue (FR ou EN).',
    },
    detected_language: {
      type: Type.STRING,
      enum: ['fr', 'en'],
    },
    qualification_complete: {
      type: Type.BOOLEAN,
      description:
        "True dès que le besoin permet d'identifier au moins un Pôle et un contexte projet suffisant pour pré-remplir le configurateur.",
    },
    recommended_poles: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        enum: ['BRANDING', 'WEB', 'MOBILE_DESKTOP', 'GROWTH'],
      },
      description: 'Liste des Pôles Ouest Dynamics pertinents pour le besoin exprimé.',
    },
    recommended_modifiers: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        enum: ['TRANSVERSE_DA', 'TRANSVERSE_AI'],
      },
      description: 'Moteurs transverses recommandés.',
    },
    urgency_tier: {
      type: Type.STRING,
      enum: ['STANDARD', 'FAST_TRACK_48H'],
    },
    suggested_currency: {
      type: Type.STRING,
      enum: ['XOF', 'EUR', 'USD'],
    },
    synthesized_project_summary: {
      type: Type.STRING,
      description:
        'Synthèse structurée du brief prête à être injectée dans le Configurateur de Devis.',
    },
    next_follow_up_question: {
      type: Type.STRING,
      description:
        'Une seule question ciblée pour affiner le périmètre si qualification_complete est false, sinon chaîne vide.',
    },
  },
};

async function startServer() {
  const db = await JSONFilePreset<DatabaseSchema>(dbFilePath, defaultData);

  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '64kb' }));
  app.use(express.urlencoded({ extended: true, limit: '64kb' }));

  function resolveBaseUrl(req: express.Request): string {
    if (process.env.APP_URL) {
      return process.env.APP_URL.replace(/\/+$/, '');
    }
    const proto = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || `localhost:${PORT}`;
    return `${proto}://${host}`;
  }

  // SEO Endpoints: /robots.txt and /sitemap.xml
  app.get('/robots.txt', (req, res) => {
    const baseUrl = resolveBaseUrl(req);
    const robotsTxt = [
      '# Ouest Dynamics — Sovereign Digital Architecture V2',
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      '',
      `Sitemap: ${baseUrl}/sitemap.xml`,
      '',
    ].join('\n');

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(robotsTxt);
  });

  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = resolveBaseUrl(req);
    const lastMod = new Date().toISOString().split('T')[0];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/#poles</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#governance</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#portfolio</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#configurator</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#legal</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(sitemapXml);
  });

  // 1. API: Executive AI Concierge & Brief Qualifier (Structured JSON Output)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history = [], language = 'fr', activeCurrency = 'XOF' } = req.body;

      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const contents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

      if (Array.isArray(history)) {
        for (const turn of history.slice(-6)) {
          if (
            turn &&
            (turn.role === 'user' || turn.role === 'model') &&
            typeof turn.text === 'string' &&
            turn.text.trim()
          ) {
            contents.push({
              role: turn.role,
              parts: [{ text: turn.text.trim() }],
            });
          }
        }
      }

      // Isolate user input strictly inside role: 'user' per security_policy.prompt_injection_guard
      contents.push({
        role: 'user',
        parts: [
          {
            text: `[Langue UI active: ${language} | Devise active: ${activeCurrency}]\nMessage du prospect : ${message
              .trim()
              .slice(0, 1500)}`,
          },
        ],
      });

      const ai = getGenAIClient();
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents,
        config: {
          systemInstruction: CONCIERGE_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: CONCIERGE_RESPONSE_SCHEMA,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);

      return res.json({
        diagnostic: {
          reply_message:
            parsed.reply_message ||
            (language === 'en'
              ? 'I have analyzed your project requirements and mapped the relevant Execution Poles.'
              : 'J’ai analysé votre besoin et cartographié les Pôles d’intervention pertinents.'),
          detected_language: parsed.detected_language === 'en' ? 'en' : 'fr',
          qualification_complete: Boolean(parsed.qualification_complete),
          recommended_poles: Array.isArray(parsed.recommended_poles)
            ? parsed.recommended_poles
            : ['WEB'],
          recommended_modifiers: Array.isArray(parsed.recommended_modifiers)
            ? parsed.recommended_modifiers
            : [],
          urgency_tier:
            parsed.urgency_tier === 'FAST_TRACK_48H' ? 'FAST_TRACK_48H' : 'STANDARD',
          suggested_currency:
            parsed.suggested_currency === 'EUR' || parsed.suggested_currency === 'USD'
              ? parsed.suggested_currency
              : activeCurrency || 'XOF',
          synthesized_project_summary: parsed.synthesized_project_summary || '',
          next_follow_up_question: parsed.next_follow_up_question || '',
        },
      });
    } catch (err: any) {
      console.error('[AI Concierge Error]:', err);
      return res.status(500).json({
        error:
          err?.message ||
          'An error occurred while communicating with the Executive AI Concierge.',
      });
    }
  });

  // 2. API: Submit 4-Step Brief Configurator Dossier
  app.post('/api/submissions', async (req, res) => {
    try {
      const clientIp =
        (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
        req.socket.remoteAddress ||
        'unknown';

      if (!checkRateLimit(clientIp)) {
        return res.status(429).json({
          error: 'Too many requests. Please wait a few minutes before submitting again.',
        });
      }

      const {
        fullName,
        companyName,
        email,
        phone,
        selectedPoles = [],
        selectedModifiers = [],
        urgency = 'STANDARD',
        currency = 'XOF',
        estimatedRange = '',
        summary,
        consent,
      } = req.body;

      if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
        return res.status(400).json({ error: 'Full name is required (min 2 characters).' });
      }
      if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 2) {
        return res.status(400).json({ error: 'Company name is required (min 2 characters).' });
      }
      if (
        !email ||
        typeof email !== 'string' ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())
      ) {
        return res.status(400).json({ error: 'A valid corporate email address is required.' });
      }
      // Strict E.164 phone validation
      const cleanedPhone = typeof phone === 'string' ? phone.replace(/\s+/g, '') : '';
      if (!/^\+[1-9]\d{7,14}$/.test(cleanedPhone)) {
        return res.status(400).json({
          error: 'A valid international E.164 phone number is required (e.g. +2250708091011).',
        });
      }
      if (!summary || typeof summary !== 'string' || summary.trim().length < 15) {
        return res
          .status(400)
          .json({ error: 'Project summary is required (minimum 15 characters).' });
      }
      if (!consent) {
        return res
          .status(400)
          .json({ error: 'ARTCI / GDPR consent validation is required.' });
      }

      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const reference = `OD-2026-${randomDigits}`;
      const now = new Date().toISOString();

      const record: SubmissionRecord = {
        id: `brief_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        reference,
        fullName: fullName.trim().slice(0, 120),
        companyName: companyName.trim().slice(0, 120),
        email: email.trim().toLowerCase().slice(0, 160),
        phone: cleanedPhone,
        selectedPoles: Array.isArray(selectedPoles) ? selectedPoles : ['WEB'],
        selectedModifiers: Array.isArray(selectedModifiers) ? selectedModifiers : [],
        urgency,
        currency,
        estimatedRange: String(estimatedRange || '').slice(0, 120),
        summary: summary.trim().slice(0, 3000),
        consentTimestamp: now,
        createdAt: now,
        status: 'received',
      };

      await db.update(({ submissions, analytics }) => {
        submissions.unshift(record);
        analytics.totalRequests += 1;
        analytics.lastRequestAt = now;
      });

      return res.status(201).json({
        success: true,
        reference: record.reference,
        submission: record,
      });
    } catch (err: any) {
      console.error('[Brief Submission Error]:', err);
      return res.status(500).json({
        error: 'An internal error occurred while registering the brief.',
      });
    }
  });

  app.get('/api/health', async (_req, res) => {
    await db.read();
    res.json({
      status: 'healthy',
      version: '2.0.0',
      totalRecords: db.data.submissions.length,
      timestamp: new Date().toISOString(),
    });
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir, { maxAge: '7d' }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Ouest Dynamics V2 running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

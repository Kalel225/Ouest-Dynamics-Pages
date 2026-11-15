import express from 'express';
import { JSONFilePreset } from 'lowdb/node';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database Schema Interface
export interface SubmissionRecord {
  id: string;
  reference: string;
  fullName: string;
  companyName: string;
  email: string;
  service: string;
  budget: string;
  currency: string;
  description: string;
  createdAt: string;
  status: 'received' | 'reviewing' | 'contacted';
  userAgent?: string;
}

export interface DatabaseSchema {
  submissions: SubmissionRecord[];
  analytics: {
    totalRequests: number;
    lastRequestAt: string | null;
  };
}

// Default Database State
const defaultData: DatabaseSchema = {
  submissions: [],
  analytics: {
    totalRequests: 0,
    lastRequestAt: null,
  },
};

// Ensure data storage directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbFilePath = path.join(dataDir, 'database.json');

// Anti-Spam Rate Limiting Store (In-memory per IP: max 8 requests / 10 minutes)
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;

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

  // 0. SEO Endpoints: /robots.txt and /sitemap.xml
  app.get('/robots.txt', (req, res) => {
    const baseUrl = resolveBaseUrl(req);
    const robotsTxt = [
      '# Ouest Dynamics — Search Engine Crawler Directives',
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
    <loc>${baseUrl}/#expertises</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#portfolio</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#methodologie</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#faq</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#contact</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#politique-de-confidentialite</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/#cgu</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(sitemapXml);
  });

  // 1. API: AI Advisor Chatbot powered by Gemini ('gemini-4-hydrogen')
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history = [], language = 'fr', currency } = req.body;

      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const currencyCode = currency?.code || 'USD';
      const currencySymbol = currency?.symbol || '$';
      const budgetRanges = Array.isArray(currency?.budgets)
        ? currency.budgets.map((b: any) => `${b.label} (${b.desc})`).join(' | ')
        : '';

      const systemInstruction =
        language === 'fr'
          ? `Tu incarnes le "Luxury Engineering Partner" (Partenaire d'Ingénierie & de Croissance de Luxe) d'Ouest Dynamics — maison d'architecture digitale et d'ingénierie sur-mesure ("L'Excellence Numérique au Service de Votre Croissance").

Identité & Posture Éditoriale ("Luxury Engineering Partner") :
- Ton : Élégant, posé, stratégique, rassurant et d'une clarté absolue. Tu t'exprimes avec la courtoisie et la précision d'un associé de maison d'architecture ou de haute horlogerie digitale, tout en restant limpide et parfaitement accessible aux dirigeants non-techniciens.
- Philosophie : Chez Ouest Dynamics, chaque plateforme web, boutique e-commerce ou application mobile est conçue comme une œuvre architecturale durable, alliant esthétique intemporelle, performance mesurable et simplicité d'utilisation au quotidien.

Piliers de la Maison Ouest Dynamics :
1. Nos 4 Domaines d'Excellence :
   - Plateformes Web & Boutiques E-Commerce Sur-Mesure : architectures haute performance, expérience mobile irréprochable et administration intuitive (livraison : 2 à 4 semaines).
   - Applications Mobiles (iOS & Android) & Écosystèmes Métier : solutions propriétaires fluides, sécurisées et taillées pour la croissance (livraison : 4 à 8 semaines).
   - Direction Artistique, Identité de Marque & UI/UX Design : systèmes visuels distinctifs et prototypes interactifs haute fidélité.
   - Croissance Digitale, Référencement (SEO) & Conversion : ingénierie d'acquisition orientée retour sur investissement (+15M$ de valeur générée pour nos clients).
2. Notre Méthodologie en 3 Temps :
   - 01. Cadrage & Feuille de Route Stratégique (48h) : écoute approfondie de votre vision, définition claire du périmètre et budget fixe garanti.
   - 02. Maquette Interactive Validée Avant Ingénierie (1 à 2 semaines) : vous visualisez, testez et approuvez 100% du design et de l'ergonomie avant qu'une seule ligne de code ne soit écrite.
   - 03. Ingénierie Sur-Mesure, Déploiement & Transmission (2 à 6 semaines) : développement de précision, contrôle qualité rigoureux, mise en ligne et accompagnement de vos équipes.
3. Nos 3 Engagements Contractuels :
   - Garantie de Validation Visuelle préalable au développement (zéro imprévu).
   - Propriété Intellectuelle 100% Client dès la livraison (code source, design, domaine et données vous appartiennent intégralement, sans abonnement captif).
   - Garantie Technique de 6 mois incluse post-lancement + Accord de Non-Divulgation (NDA) automatique dès le premier échange.
4. Structure d'Investissement & Devises (${currencyCode} ${currencySymbol}) :
   - Règlement structuré en 3 jalons : 40% à l'ouverture du dossier, 30% à la validation de la maquette interactive, 30% au déploiement final.
   - Enveloppes d'investissement calibrées dans la devise du visiteur (${currencyCode}) : ${budgetRanges}.

Règles de Conversation :
- Formule des réponses structurées, concises et raffinées (2 à 4 phrases ou quelques points clés élégamment présentés).
- Réponds toujours dans la langue utilisée par ton interlocuteur, sans jargon informatique inutile.
- En conclusion d'échange pertinent, invite ton interlocuteur à initier une étude personnalisée via le configurateur de projet ou le formulaire de consultation privée (réponse sous 4 heures ouvrées).`
          : `You embody the "Luxury Engineering Partner" persona of Ouest Dynamics — a bespoke digital architecture and growth practice ("Digital Excellence Engineered for Your Growth").

Persona & Brand Voice ("Luxury Engineering Partner"):
- Tone: Poised, architectural, strategic, warm, and effortlessly clear. Speak with the measured authority and discretion of a senior partner at a flagship architectural practice or bespoke engineering atelier, while keeping every explanation completely free of technical jargon.
- Philosophy: At Ouest Dynamics, every website, e-commerce flagship, and mobile application is crafted as an enduring digital asset—combining editorial sophistication, measurable commercial performance, and intuitive day-to-day management.

Core Pillars of Ouest Dynamics:
1. Our 4 Core Practices:
   - Bespoke Web Platforms & Flagship E-Commerce: fast, mobile-first architectures with effortless visual administration (timeline: 2 to 4 weeks).
   - Custom Mobile Applications (iOS & Android) & Web Software: resilient, scalable systems engineered around your operations (timeline: 4 to 8 weeks).
   - Brand Identity, Art Direction & Interactive UI/UX Design: distinctive visual systems and high-fidelity clickable prototypes.
   - Digital Growth, Search Authority (SEO) & Conversion Engineering: designed for measurable revenue impact (+$15M generated in client value).
2. Our Transparent 3-Step Process:
   - 01. Strategic Discovery & Roadmap (48h): plain-language scoping, architectural blueprint, and a guaranteed fixed investment.
   - 02. Interactive Visual Mockup Approved Before Engineering (1–2 weeks): experience and approve every screen of your future platform before a single line of code is written.
   - 03. Bespoke Engineering, QA & White-Glove Launch (2–6 weeks): precision build, rigorous testing, deployment, and tailored team onboarding.
3. Our 3 Contractual Guarantees:
   - Visual Mockup Approval Guarantee prior to engineering (zero surprises).
   - 100% Client Intellectual Property Ownership upon delivery (all source code, designs, domains, and data belong exclusively to you with zero vendor lock-in).
   - 6-Month Complimentary Technical Warranty post-launch + automatic NDA protection from first contact.
4. Investment Structure & Regional Calibration (${currencyCode} ${currencySymbol}):
   - Milestone-based investment: 40% at kickoff, 30% upon interactive mockup approval, 30% upon final launch.
   - Indicative investment tiers in the visitor's currency (${currencyCode}): ${budgetRanges}.

Conversation Guidelines:
- Deliver concise, articulate, and well-paced responses (2 to 4 sentences or a brief, scannable list).
- Always respond in the language used by the visitor, translating complex concepts into clear business value.
- Courteously invite the visitor to initiate a private project estimate via the project estimator or the consultation form (tailored roadmap delivered within 4 business hours).`;

      const contents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

      if (Array.isArray(history)) {
        for (const turn of history.slice(-8)) {
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

      contents.push({
        role: 'user',
        parts: [{ text: message.trim().slice(0, 1500) }],
      });

      const ai = getGenAIClient();
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents,
        config: {
          systemInstruction,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const replyText =
        response.text ||
        (language === 'fr'
          ? 'Je suis à votre écoute pour vous accompagner sur votre projet digital.'
          : 'I am here to help guide you with your digital project.');

      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error('[Gemini Chat Error]:', err);
      return res.status(500).json({
        error:
          err?.message ||
          'An error occurred while communicating with the AI advisor.',
      });
    }
  });

  // 2. API: Submit new project quote / contact request (with server-side validation & anti-spam)
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
        service,
        budget,
        currency,
        description,
        _honeypot,
        _elapsedMs,
      } = req.body;

      // Anti-Spam Layer 1: Honeypot Trap
      if (_honeypot && typeof _honeypot === 'string' && _honeypot.trim().length > 0) {
        return res.status(400).json({ error: 'Automated spam submission rejected' });
      }

      // Anti-Spam Layer 2: Submission Velocity Check (< 1000ms indicates bot automation)
      if (typeof _elapsedMs === 'number' && _elapsedMs < 1000) {
        return res.status(429).json({ error: 'Submission sent too quickly. Please try again.' });
      }

      // Server-side field validation
      if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
        return res.status(400).json({ error: 'Full name is required (minimum 2 characters)' });
      }
      if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 2) {
        return res
          .status(400)
          .json({ error: 'Company or project name is required (minimum 2 characters)' });
      }
      if (
        !email ||
        typeof email !== 'string' ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())
      ) {
        return res.status(400).json({ error: 'A valid email address is required' });
      }
      if (!description || typeof description !== 'string' || description.trim().length < 15) {
        return res
          .status(400)
          .json({ error: 'Project description is required (minimum 15 characters)' });
      }

      const year = new Date().getFullYear();
      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const reference = `OD-${year}-${randomSuffix}`;
      const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const now = new Date().toISOString();

      const record: SubmissionRecord = {
        id,
        reference,
        fullName: fullName.trim().slice(0, 120),
        companyName: companyName.trim().slice(0, 120),
        email: email.trim().toLowerCase().slice(0, 160),
        service: service || 'web',
        budget: budget || 'standard',
        currency: currency || 'USD',
        description: description.trim().slice(0, 3000),
        createdAt: now,
        status: 'received',
        userAgent: req.headers['user-agent'] || '',
      };

      // Save record to persistent database
      await db.update(({ submissions, analytics }) => {
        submissions.unshift(record);
        analytics.totalRequests += 1;
        analytics.lastRequestAt = now;
      });

      console.log(`[Database] Stored quote submission reference: ${reference} from ${record.email}`);

      return res.status(201).json({
        success: true,
        message: 'Submission successfully recorded in database',
        reference: record.reference,
        submission: record,
      });
    } catch (err: any) {
      console.error('[Database Error] Failed to process submission:', err);
      return res.status(500).json({
        error: 'An internal error occurred while saving the submission',
        details: err?.message,
      });
    }
  });

  // 3. API: Query submissions list (for admin dashboard / audit)
  app.get('/api/submissions', async (_req, res) => {
    try {
      await db.read();
      res.json({
        total: db.data.submissions.length,
        submissions: db.data.submissions,
        analytics: db.data.analytics,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to read submissions', details: err?.message });
    }
  });

  // 4. API: Query single submission by reference
  app.get('/api/submissions/:reference', async (req, res) => {
    try {
      const { reference } = req.params;
      await db.read();
      const found = db.data.submissions.find(
        (s) => s.reference.toLowerCase() === reference.toLowerCase()
      );
      if (!found) {
        return res.status(404).json({ error: 'Dossier not found' });
      }
      return res.json({ submission: found });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to lookup submission', details: err?.message });
    }
  });

  // 5. API: Health Check
  app.get('/api/health', async (_req, res) => {
    await db.read();
    res.json({
      status: 'healthy',
      database: 'lowdb-json-persistent',
      path: dbFilePath,
      totalRecords: db.data.submissions.length,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  // 6. Cache static image assets for fast repeat loading
  app.use(
    '/src/assets/images',
    express.static(path.join(__dirname, 'src/assets/images'), {
      maxAge: '7d',
      immutable: true,
    })
  );

  // 7. Mount Vite in Development or serve static in Production
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
    app.use(
      express.static(distDir, {
        maxAge: '7d',
      })
    );
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Ouest Dynamics full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

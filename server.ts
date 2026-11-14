import express from 'express';
import { JSONFilePreset } from 'lowdb/node';
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
const db = await JSONFilePreset<DatabaseSchema>(dbFilePath, defaultData);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '64kb' }));

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

// 1. API: Submit new project quote / contact request (with server-side validation & anti-spam)
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

// 2. API: Query submissions list (for admin dashboard / audit)
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

// 3. API: Query single submission by reference
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

// 4. API: Health Check
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

// 5. Cache static image assets for fast repeat loading
app.use(
  '/src/assets/images',
  express.static(path.join(__dirname, 'src/assets/images'), {
    maxAge: '7d',
    immutable: true,
  })
);

// 6. Mount Vite in Development or serve static in Production
const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: {
      middlewareMode: true,
      host: '0.0.0.0',
      port: PORT,
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

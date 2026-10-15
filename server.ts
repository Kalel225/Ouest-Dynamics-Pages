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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. API: Submit new project quote / contact request
app.post('/api/submissions', async (req, res) => {
  try {
    const { fullName, companyName, email, service, budget, currency, description } = req.body;

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({ error: 'Full name is required' });
    }
    if (!companyName || typeof companyName !== 'string' || !companyName.trim()) {
      return res.status(400).json({ error: 'Company or project name is required' });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required' });
    }
    if (!description || typeof description !== 'string' || !description.trim()) {
      return res.status(400).json({ error: 'Project description is required' });
    }

    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const reference = `OD-${year}-${randomSuffix}`;
    const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const now = new Date().toISOString();

    const record: SubmissionRecord = {
      id,
      reference,
      fullName: fullName.trim(),
      companyName: companyName.trim(),
      email: email.trim().toLowerCase(),
      service: service || 'web',
      budget: budget || 'standard',
      currency: currency || 'USD',
      description: description.trim(),
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

// 5. Mount Vite in Development or serve static in Production
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
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] Ouest Dynamics full-stack server running on http://0.0.0.0:${PORT}`);
});

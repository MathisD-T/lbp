import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const PORT = process.env.PORT || 4000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'changeme';
if (!process.env.ADMIN_TOKEN) {
  console.warn('[API] ADMIN_TOKEN non défini, utilisation du token par défaut "changeme".');
}
const dataDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dataDir, 'db.sqlite');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    description TEXT NOT NULL,
    images TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

// Migration légère : ajouter la colonne images si elle n'existe pas déjà
const columns = db.prepare(`PRAGMA table_info(projects)`).all();
const hasImagesColumn = columns.some((col) => col.name === 'images');
if (!hasImagesColumn) {
  db.exec(`ALTER TABLE projects ADD COLUMN images TEXT`);
}

const countProjects = db.prepare('SELECT COUNT(*) as count FROM projects').get().count;
if (countProjects === 0) {
  const seed = db.prepare(`
    INSERT INTO projects (id, title, category, location, imageUrl, description)
    VALUES (@id, @title, @category, @location, @imageUrl, @description)
  `);
  const sample = [
    {
      id: '1',
      title: 'Toiture Mont-Royal',
      category: 'Toiture',
      location: 'Montréal, QC',
      imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop',
      description: 'Réfection complète avec membrane élastomère et isolation améliorée.'
    },
    {
      id: '2',
      title: 'Façade Contemporaine',
      category: 'Revêtement Extérieur',
      location: 'Brossard, QC',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      description: 'Revêtement CanExel + aluminium noir, soffites ventilés et éclairage encastré.'
    },
    {
      id: '3',
      title: 'Sous-sol Signature',
      category: 'Finition de Sous-sol',
      location: 'Laval, QC',
      imageUrl: 'https://images.unsplash.com/photo-1512914890250-353c97c9e7e2?q=80&w=1600&auto=format&fit=crop',
      description: 'Cinéma maison, cave à vin vitrée et bureau insonorisé.'
    },
    {
      id: '4',
      title: 'Salle de Bain Spa',
      category: 'Salle de Bain',
      location: 'Longueuil, QC',
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
      description: 'Douche italienne, bain autoportant et céramique chauffante grand format.'
    },
    {
      id: '5',
      title: 'Garage Atelier',
      category: 'Construction de Garage',
      location: 'Terrebonne, QC',
      imageUrl: 'https://images.unsplash.com/photo-1563274640-e220a0614f16?q=80&w=1600&auto=format&fit=crop',
      description: 'Garage double détaché avec mezzanine et plancher époxy.'
    },
    {
      id: '6',
      title: 'Patio Niveau',
      category: 'Patio & Terrasses',
      location: 'Saint-Lambert, QC',
      imageUrl: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1600&auto=format&fit=crop',
      description: 'Terrasse multi-niveaux en composite, garde-corps verre et cuisine extérieure.'
    },
    {
      id: '7',
      title: 'Vitrines Sur Rue',
      category: 'Rénovation Commerciale',
      location: 'Plateau Mont-Royal, QC',
      imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600&auto=format&fit=crop',
      description: 'Réaménagement complet de boutique : façade vitrée, éclairage accent et mobilier sur mesure.'
    },
    {
      id: '8',
      title: 'Portes & Fenêtres Noir Mat',
      category: 'Portes et Fenêtres',
      location: 'Outremont, QC',
      imageUrl: 'https://images.unsplash.com/photo-1506180370005-559ccb7a69bc?q=80&w=1600&auto=format&fit=crop',
      description: 'Remplacement complet par aluminium noir thermos double Low-E, seuils scellés et calfeutrage pro.'
    }
  ];
  const insertMany = db.transaction((rows) => {
    rows.forEach(row => seed.run(row));
  });
  insertMany(sample);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(dataDir, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(dataDir, 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    cb(null, `${Date.now()}_${base}${ext}`);
  }
});

const upload = multer({ storage });

app.get('/', (_req, res) => {
  res.send('API Les Beaux Projets - endpoints: GET /api/health, GET /api/projects, POST /api/projects (token), DELETE /api/projects/:id (token)');
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/projects', (_req, res) => {
  const rows = db.prepare('SELECT * FROM projects ORDER BY datetime(created_at) DESC').all();
  const mapped = rows.map(r => ({
    ...r,
    images: r.images ? JSON.parse(r.images) : []
  }));
  res.json(mapped);
});

const requireAuth = (req, res, next) => {
  const header = req.headers['authorization'] || '';
  const token = req.headers['x-admin-token'] || '';
  const bearer = header.startsWith('Bearer ') ? header.slice(7) : '';
  const provided = bearer || token;
  if (!provided || provided !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

app.post('/api/projects', requireAuth, (req, res) => {
  const fields = upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'images', maxCount: 20 }
  ]);

  fields(req, res, () => {
    const { title, category, location, description } = req.body || {};
    if (!title || !category || !location || !description) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    const coverFile = req.files?.['cover']?.[0];
    const coverPath = coverFile
      ? `/uploads/${path.basename(coverFile.path)}`
      : (req.body?.imageUrl || '');
    if (!coverPath) {
      return res.status(400).json({ error: 'Image principale requise (upload ou existante).' });
    }
    const files = (req.files?.['images'] || []).map((f) => `/uploads/${path.basename(f.path)}`);
    const imagesJson = files.length > 0 ? JSON.stringify(files) : null;
    const id = Date.now().toString();
    db.prepare(`
      INSERT INTO projects (id, title, category, location, imageUrl, description, images)
      VALUES (@id, @title, @category, @location, @imageUrl, @description, @images)
    `).run({ id, title, category, location, imageUrl: coverPath, description, images: imagesJson });
    const created = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    if (created && created.images) {
      created.images = JSON.parse(created.images);
    }
    res.status(201).json(created);
  });
});

app.delete('/api/projects/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM projects WHERE id = ?').run(id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`API server ready on http://localhost:${PORT}`);
});

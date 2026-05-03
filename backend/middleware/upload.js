import multer from 'multer';
import path from 'path';
import fs from 'fs';

const dir = path.join(process.cwd(), 'uploads');
try {
  if (!fs.existsSync(dir)) {
    // On Vercel /tmp is the only writable directory
    const uploadDir = process.env.VERCEL ? '/tmp' : dir;
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (e) {
  console.log('Upload directory check skipped:', e.message);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.VERCEL ? '/tmp' : dir;
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });

import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Ensure the public/temp directory exists
const localDir = './public/temp';
const tempDir = process.env.NODE_ENV === 'production' ? '/tmp' : localDir;

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({
  storage,
});

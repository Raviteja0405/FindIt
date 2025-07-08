import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Save files temporarily to disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '_' + path.basename(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

export { upload };

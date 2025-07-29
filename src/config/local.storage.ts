import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const field = file.fieldname;
    const folder = `storage/${field}s`;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const fieldName = file.fieldname;
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}_${fieldName}${ext}`;
    cb(null, fileName);
  }
});

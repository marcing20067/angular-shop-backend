import { Request } from 'express';
import multer from 'multer';
const IMAGE_EXTS = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
};

const IMAGES_DIRNAME = 'images';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGES_DIRNAME);
  },
  filename: (req, file, cb) => {
    const ext = (IMAGE_EXTS as any)[file.mimetype];
    cb(null, `${file.originalname}.${ext}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const isCorrectType = !!(IMAGE_EXTS as any)[file.mimetype];
  cb(null, isCorrectType);
};

const upload = multer({
  dest: IMAGES_DIRNAME,
  storage,
  fileFilter: fileFilter,
});

export default upload.single('image');

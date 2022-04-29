"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const IMAGE_EXTS = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
};
const IMAGES_DIRNAME = 'images';
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, IMAGES_DIRNAME);
    },
    filename: (req, file, cb) => {
        const ext = IMAGE_EXTS[file.mimetype];
        cb(null, `${file.originalname}.${ext}`);
    },
});
const fileFilter = (req, file, cb) => {
    const isCorrectType = !!IMAGE_EXTS[file.mimetype];
    cb(null, isCorrectType);
};
const upload = (0, multer_1.default)({
    dest: IMAGES_DIRNAME,
    storage,
    fileFilter: fileFilter,
});
exports.default = upload.single('image');

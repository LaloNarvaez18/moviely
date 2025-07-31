import multer from 'multer';
import { localStorage } from '../config/local.storage';

const storage = localStorage;
export const uploadFile = multer({ storage });;

import multer from 'multer';
import { localStorage } from '../config/local.storage';

const storage = localStorage;
const uploadFile = multer({ storage });

export default uploadFile;

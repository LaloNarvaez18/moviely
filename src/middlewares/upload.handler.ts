import multer from 'multer';
import { localStorage } from '../config/local.storage';

const storage = localStorage;
const uploadRequestFile = multer({ storage });

export default uploadRequestFile;

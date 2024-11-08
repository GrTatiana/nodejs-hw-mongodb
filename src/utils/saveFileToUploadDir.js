import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../../index.js';

export const saveFileToUploadDir = async (file) => {
  const oldPath = path.join(TEMP_UPLOAD_DIR, file.filename);
  console.log('oldPath', oldPath);
  const newPath = path.join(UPLOAD_DIR, file.filename);
  console.log('newPath', newPath);
  await fs.rename(oldPath, newPath);
  return newPath;
};

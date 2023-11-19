import multer from 'multer';

const storage = multer.memoryStorage();

export const uploader = multer({
  storage: storage,
});

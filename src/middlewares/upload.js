import multer from 'multer';

// Menyimpan file di RAM sementara
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;
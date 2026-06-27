export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    file: req.file, // Menyertakan objek file dari Multer jika ada
  });

  if (!result.success) {
    return res.status(400).json({
      status: 'fail',
      errors: result.error.errors.map((err) => ({
        // Menampilkan lokasi error (body atau file)
        field: err.path.join('.').replace('body.', '').replace('file.', ''),
        message: err.message,
      })),
    });
  }

  // Masukkan kembali data yang sudah tersanitasi ke Express
  req.body = result.data.body;
  if (req.file) req.file = result.data.file;

  next();
};

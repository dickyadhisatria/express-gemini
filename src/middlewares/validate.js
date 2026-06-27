export const validate = (schema) => (req, res, next) => {

  const result = schema.safeParse(req);

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

  // Jika ada file, masukkan kembali data file yang sudah tervalidasi
  if (result.data.file) {
    req.file = {
      ...req.file,
      mimetype: result.data.file.mimetype,
    };
  }

  next();
};

/*
error berikut dari mana? 
{
  "message": "{\"error\":{\"code\":400,\"message\":\"Invalid value at 'contents[0].parts[1].inline_data.data' (TYPE_BYTES), Base64 decoding failed for \\\"[object ArrayBuffer]\\\"\",\"status\":\"INVALID_ARGUMENT\",\"details\":[{\"@type\":\"type.googleapis.com/google.rpc.BadRequest\",\"fieldViolations\":[{\"field\":\"contents[0].parts[1].inline_data.data\",\"description\":\"Invalid value at 'contents[0].parts[1].inline_data.data' (TYPE_BYTES), Base64 decoding failed for \\\"[object ArrayBuffer]\\\"\"}]}]}}"
}
  */
 // 
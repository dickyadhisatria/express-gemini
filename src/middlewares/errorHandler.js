export const errorHandler = (err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
            status: 'error',
            message: 'Ukuran file terlalu besar! Maksimal 5 MB'
        })
    }

    console.error(`[ERROR FATAL]: ${err.message}`);

    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    })
};
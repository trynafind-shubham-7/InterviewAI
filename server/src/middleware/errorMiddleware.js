const errorHandler = (err, req, res, next) => {

    console.error("❌ Server Error:", err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({

        success: false,

        message:
            err.message ||
            "Something went wrong on the server."

    });

};

module.exports = errorHandler;
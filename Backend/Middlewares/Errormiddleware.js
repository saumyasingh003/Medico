class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export const ErrorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;
  


    if (err.code === 11000) {
      const message = `User already exist with this ${Object.keys(err.keyValue)}!`;
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. Try again!";
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token has expired. Try again!";
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "CastError") {
      const message = `Invalid ${err.path}`;
      err = new ErrorHandler(message, 400);
    }
  
    // Extract model-defined validation error messages if present
    const errorMessage = err.errors
      ? Object.values(err.errors).map((error) => error.message).join(", ")
      : err.message;
  
    return res.status(err.statusCode).json({
      success: false,
      message: errorMessage,
    });
  };
  
  export default ErrorHandler;
  
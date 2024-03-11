import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/errors";

interface ResponseError extends Error {
  statusCode?: number;
  error?: string;
}

// Error handler middleware
export const errorHandler = (
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  // Default error status code and message
  let errorName = err.error || "INTERNAL_SERVER_ERROR";
  let statusCode = err.statusCode || 500;
  let errorMessage = err.message || "Some error occured at the server";

  // Set status code and message based on error type
  if (err instanceof BadRequestError) {
    errorName = err.error || "BAD_REQUEST";
    statusCode = err.statusCode || 400;
    errorMessage = err.message || "Invalid or malformed request received";
  }

  // Send error response
  res
    .status(statusCode)
    .json({ statusCode, error: errorName, message: errorMessage });
};

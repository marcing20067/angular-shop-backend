export interface CustomError extends Error {
  errorMessage?: string;
  statusCode?: number;
}

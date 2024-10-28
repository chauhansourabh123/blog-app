class ApiError extends Error {
  constructor(
    statuscode,
    message = "Something went wrong",
    data = null,
    success = false
  ) {
    super(message);
    this.statuscode = statuscode;
    this.data = data;
    this.success = success;

    if (Error.capturedStackTrace) {
      Error.capturedStackTrace(this, ApiError);
    }
  }
}

export default ApiError;

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      console.log("Async handler Error:", error.message);
      next(error);
    });
  };
};

export default asyncHandler;

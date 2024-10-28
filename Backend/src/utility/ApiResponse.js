class ApiResponse {
  constructor(
    statuscode,
    message = "successfully done",
    data = null,
    success = true
  ) {
    this.statuscode = statuscode;
    this.message = message;
    this.data = data;
    this.success = success;
  }
}

export default ApiResponse;

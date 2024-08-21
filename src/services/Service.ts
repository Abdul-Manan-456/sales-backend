import { ResponseModel } from "../interfaces/index.js";

export default class Service {
  response({ code, message, data, error }: ResponseModel) {
    return {
      code,
      message: message || "Internal Error Occur",
      data,
      error,
    };
  }
}

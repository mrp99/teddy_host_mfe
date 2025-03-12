import { HttpStatusCode } from "../enums/httpStatusCode";

export const ERROR_MESSAGES: Record<HttpStatusCode, string> = {
  [HttpStatusCode.BAD_REQUEST]: "Dados inválidos. Verifique as informações e tente novamente.",
  [HttpStatusCode.NOT_FOUND]: "Cliente não encontrado.",
  [HttpStatusCode.CONFLICT]: "Já existe um cliente com estas informações.",
  [HttpStatusCode.SERVER_ERROR]: "Erro no servidor. Tente novamente mais tarde.",
}
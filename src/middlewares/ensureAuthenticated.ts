import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { SimpleConsoleLogger } from "typeorm";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response,
  Response,
  next: NextFunction
) {
  //recebe o token
  const authToken = request.headers.authorization;

  // valida se token esta vazio
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    // valida se token é valido
    const { sub } = verify(
      token,
      "c5bf2481abf8341fdf604657bab99667"
    ) as IPayload;

    // recupera informações do usuario
    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}

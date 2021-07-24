import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;

  const usersRepositories = getCustomRepository(UsersRepositories);

  const { admin } = await usersRepositories.findOne(user_id);

  // Verifica se usario admin
  if (admin) {
    return next();
  }

  if (!admin) {
    return response.status(401).json({
      error: "Unauthorized",
    });
  }
}
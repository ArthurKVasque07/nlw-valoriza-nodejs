import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({
      email
    });

    if (!user) {
      throw new Error("Email/password incorrect!")
    }

    // verifica se a senha esta correta
    // 1234 / 154646-fgsgsd
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error("Email/password incorrect!")
    }

    const token = sign(
      {
        email: user.email
      }, "c5bf2481abf8341fdf604657bab99667",
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return token;
  }
}

export { AuthenticateUserService }
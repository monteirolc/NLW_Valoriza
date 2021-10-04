import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest{
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest){
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email
    });

    if(!user){
      throw new Error("E-mail/Password incorrect")
    }
    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch){
      throw new Error("E-mail/Password incorrect")
    }
    const token = sign({
      email: user.email},"b7c7e4ff995058bc2e064ad84cbeefae",
      {subject: user.id,
      expiresIn: "1d"});
        return token;
    }
  
}

export {AuthenticateUserService}
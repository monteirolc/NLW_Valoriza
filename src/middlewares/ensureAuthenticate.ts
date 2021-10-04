import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
  sub:string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

  //Receber token
  const authToken = request.headers.authorization;

  if(!authToken){
    return response.status(401).end();
  }

  const [,token] = authToken.split(" ");
  
  //Validar Token (se está preenchido)
 try{
   const {sub} = verify(token,"b7c7e4ff995058bc2e064ad84cbeefae") as IPayload;
   request.user_id = sub;
   return next();

 } catch (err){
  return response.status(401).end();
 }
 
 
 //Certificar se o tokem é válido
 
 //Recuperar informações do usuário
 
 return next();
}
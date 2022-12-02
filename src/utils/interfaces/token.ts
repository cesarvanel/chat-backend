import Jwt from "jsonwebtoken";
import User from "@resources/user/user.interface";
import Token from "@utils/interfaces/token.interface";

export const CreateToken = (User: User): string => {
  return Jwt.sign({ id: User.userToken}, process.env.JWT_TOKEN as Jwt.Secret, {
    expiresIn: "1d",
  });
};

export const VerifyToken = async (
  token: string
): Promise<Jwt.VerifyErrors | Token> => {
  return new Promise((resolve, rejects) => {
    Jwt.verify(token, process.env.JWT_SECRET as Jwt.Secret, (err, result) => {
      if (err) rejects(err);
      resolve(result as Token);
    });  
  });
};

export default { CreateToken, VerifyToken };

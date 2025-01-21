import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserService from "./user";
import { user } from "@prisma/client";
import OmitSensitiveData from "../utils/omitSensitiveSata";
import { AuthUser, sensitiveFields } from "../enum/authUser";

const userService = new UserService();

class AuthService {
  async signup(username: string, password: string, email: string): Promise<Omit<user, "password_hash">> {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: user = await userService.createUser({ username, password_hash: passwordHash, email }) as user;
    if (newUser) {
      OmitSensitiveData(newUser, sensitiveFields)
    }
    return newUser;
  }

  validatePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  generateToken(user: Pick<user, "email" | "id">): string {
    return jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET as jwt.Secret,
      { algorithm: "HS512", expiresIn: "1d" }
    );
  }
}

export default AuthService;

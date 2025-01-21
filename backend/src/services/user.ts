import { Prisma, PrismaClient, task, user } from "@prisma/client";
import OmitSensitiveData from "../utils/omitSensitiveSata";
import { AuthUser, sensitiveFields } from "../enum/authUser";

const prisma = new PrismaClient();

class UserService {
  async getUsers(): Promise<Omit<user[], AuthUser.PasswordHash | AuthUser.CreatedAt | AuthUser.ModifiedAt>> {
    const users: user[] | null = await prisma.user.findMany();
    if (users) {
      OmitSensitiveData(users, sensitiveFields)
    }
    return users
  }

  async getUserById(id: string): Promise<Omit<user, AuthUser.PasswordHash | AuthUser.CreatedAt | AuthUser.ModifiedAt> | null> {
    const user: user | null = await prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      OmitSensitiveData(user, sensitiveFields)
    }
    return user
  }

  async getUserVerify(email: string): Promise<Omit<user, AuthUser.CreatedAt | AuthUser.ModifiedAt> | null> {
    const user: user | null = await prisma.user.findUnique({
      where: { email },
    });
    return user
  }

  async createUser(userData: Prisma.userCreateInput): Promise<Omit<user, AuthUser.PasswordHash | AuthUser.CreatedAt | AuthUser.ModifiedAt>> {
    const user: user | null = await prisma.user.create({ data: userData });
    if (user) {
      OmitSensitiveData(user, sensitiveFields)
    }
    return user
  }

  async getUserTasks(userId: string): Promise<task[]> {
    return await prisma.task.findMany({ where: { created_by: userId }, include: { status: { select: { status: true } } } });
  }
}

export default UserService;

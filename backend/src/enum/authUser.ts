import { user } from "@prisma/client";

export enum AuthUser {
  PasswordHash = 'password_hash',
  CreatedAt = 'created_at',
  ModifiedAt = 'modified_at'
}
export const sensitiveFields: (keyof user)[] = [AuthUser.PasswordHash, AuthUser.CreatedAt, AuthUser.ModifiedAt];

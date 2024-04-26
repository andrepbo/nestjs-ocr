import { EntitySchema } from "typeorm";
import { User } from "../entities/user.entity";
import { UserRole } from "../constants/user.constants";

export const UserSchema = new EntitySchema<User>({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: "enum",
      enum: UserRole,
      default: UserRole.GUEST
    },
    createdAt: {
      type: Date,
      createDate: true,
    },
    updatedAt: {
      type: Date,
      updateDate: true,
    },
    deletedAt: {
      type: Date,
      nullable: true,
    },
  },
});
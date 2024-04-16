import { EntitySchema } from "typeorm";
import { User } from "../entities/user.entity";

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
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: "enum",
      enum: ["admin", "guest"],
      default: "guest",
    },
    createdAt: {
      type: "timestamp",
    },
    updatedAt: {
      type: "timestamp",
    },
    deletedAt: {
      type: "timestamp",
      nullable: true,
    },
  },
});
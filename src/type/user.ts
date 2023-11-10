import { User } from "firebase/auth";

export type UserType = User & {
  isAdmin: boolean;
};

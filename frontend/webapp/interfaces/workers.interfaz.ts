import { Users } from "./users.interfaz";

export interface Workers {
  userId: string;
  password: string;
  salesPermission: boolean;
  inventoryPermission: boolean;
  usersPermission: boolean;
  billsPermission: boolean;
  user: Users;
}

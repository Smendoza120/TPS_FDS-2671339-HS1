import { CurrentUserDetailInterface } from "./current-user-detail.interface";

export interface CurrentUserInterface {
  expiredDate: string;
  token: string;
  oUser: CurrentUserDetailInterface;
}

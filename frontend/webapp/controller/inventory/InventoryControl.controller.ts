import { getListStorage, listStorage } from "../../model/models";
import Base from "../Base.controller";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class InventoryControl extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    this.getView()?.setModel(getListStorage(), "oListStorage");

    listStorage();
  }
}

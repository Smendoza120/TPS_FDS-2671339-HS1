import Controller from "sap/ui/core/mvc/Controller";
import Base from "./Base.controller";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class Home extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {}

  public goToUsersPage() {
    this.getRouter().navTo("RouteUsers");
  }

  public goToInventoryPage() {
    this.getRouter().navTo("RouteInventory");
  }
}

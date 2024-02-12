import SplitApp from "sap/m/SplitApp";
import Base from "../Base.controller";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class SplitPage extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {}

  public goToHome() {
    this.getRouter().navTo("RouteHome");
  }

  public onInventoryControl() {
    const inventorySplit = this.getView()?.byId("inventorySplit") as SplitApp;

    inventorySplit.to(this.createId("inventoryControl") || "", "fade");
  }

  public onReportInventory() {
    const inventorySplit = this.getView()?.byId("inventorySplit") as SplitApp;

    inventorySplit.to(this.createId("reportInventory") || "", "fade");
  }

  public onListInventory() {
    const inventorySplit = this.getView()?.byId("inventorySplit") as SplitApp;

    inventorySplit.to(this.createId("listInventory") || "", "fade");
  }
}

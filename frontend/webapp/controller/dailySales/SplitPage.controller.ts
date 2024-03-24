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

  public onDailySales() {
    const splitSales = this.getView()?.byId("dailySalesSplit") as SplitApp;

    splitSales.to(this.createId("dailySales") || "", "fade");
  }

  public onListSales(){
    const splitSales = this.getView()?.byId("dailySalesSplit") as SplitApp;

    splitSales.to(this.createId("listSales") || "", "fade");
  }
}

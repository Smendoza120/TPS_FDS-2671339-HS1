import Base from "../Base.controller";
import SplitApp from "sap/m/SplitApp";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class SplitPage extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    // alert("Vista usuario")
  }

  public goPrincipalPage(): void {
    this.getRouter().navTo("RouteHome");
  }

  public onUserCreatePress() {
    const userSplit = this.getView()?.byId("userSplit") as SplitApp;

    userSplit.to(this.createId("userCreation") || "", "fade");
  }

  public onUserListPress(): void {
    const userSplit = this.getView()?.byId("userSplit") as SplitApp;

    userSplit.to(this.createId("userList") || "", "fade");
  }
}

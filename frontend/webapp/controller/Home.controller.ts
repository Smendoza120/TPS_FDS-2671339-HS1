import JSONModel from "sap/ui/model/json/JSONModel";
import Base from "./Base.controller";
import GenericTile from "sap/m/GenericTile";
import MessageBox from "sap/m/MessageBox";
import BusyIndicator from "sap/ui/core/BusyIndicator";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class Home extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/

  private previousPermissions: any = {};

  public onInit(): void {
    this.getView()?.setModel(new JSONModel([]), "userPermissions");
    this.getRouter()
      .getRoute("RouteHome")
      ?.attachPatternMatched(this.loadUserPermissions, this);
  }

  public onAfterRendering(): void {
    this.loadUserPermissions();
  }

  public loadUserPermissions(): void {
    const token: string = localStorage.getItem("token") || "";

    const idWorker: string = token;

    this.callWorkerEndPoint(idWorker)
      .then((workerData: any) => {
        const currentPermissions = {
          usersPermission: workerData.usersPermission,
          invetoryPermission: workerData.inventoryPermission,
          salesPermission: workerData.salesPermission,
          billsPermission: workerData.billsPermission,
        };

        const permissionsChanged = !this.areEqual(
          currentPermissions,
          this.previousPermissions
        );

        if (permissionsChanged) {
          (this.getView()?.byId("usersTile") as GenericTile).setVisible(
            currentPermissions.usersPermission
          );
          (this.getView()?.byId("invetoryTile") as GenericTile).setVisible(
            currentPermissions.invetoryPermission
          );
          (this.getView()?.byId("salesTile") as GenericTile).setVisible(
            currentPermissions.salesPermission
          );
          (this.getView()?.byId("billTile") as GenericTile).setVisible(
            currentPermissions.billsPermission
          );

          this.previousPermissions = { ...currentPermissions };
        }
      })
      .catch((error: any) => {
        // alert("Error");
      });
  }

  private async callWorkerEndPoint(workerId: string): Promise<void> {
    try {
      const permissionsData = await this.callAjax({
        url: `/workers/${workerId}`,
        method: "GET",
      });
      return permissionsData;
    } catch (error) {
      // alert("Error2");
    }
  }

  public goFinishSession() {
    sap.ui.getCore().getEventBus().publish("onCleanForm", "onCleanForm");

    localStorage.removeItem("token");
    this.getRouter().navTo("RouteLogIn");

    window.history.replaceState({}, "", "/index.html#/logIn");
  }

  public goToUsersPage() {
    this.getRouter().navTo("RouteUsers");
  }

  public goToInventoryPage() {
    this.getRouter().navTo("RouteInventory");
  }

  public goToDailySales() {
    this.getRouter().navTo("RouteDailySales");
  }

  private areEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}

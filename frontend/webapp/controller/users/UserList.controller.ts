import JSONModel from "sap/ui/model/json/JSONModel";
import Base from "../Base.controller";
import Button from "sap/m/Button";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import { EditableInfo } from "../../interfaces/editable.interfaz";
import Table from "sap/ui/table/Table";
import MessageBox from "sap/m/MessageBox";
import Switch from "sap/m/Switch";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class UserList extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    // this.getView()?.setModel(new JSONModel([]), "oUser");
    // this.getView()?.setModel(new JSONModel([]), "oPermissions");
    // this.getView()?.setModel(new JSONModel([]), "oWorkers");

    // this.getView()?.setModel(new JSONModel([]), "oUserList");
    // this.getView()?.setModel(new JSONModel([]), "oWorkersBackup");

    this.initModels();
    this.callData();
    this.updateTableWorker();
  }

  private initModels(): void {
    this.getView()?.setModel(new JSONModel([]), "oUser");
    this.getView()?.setModel(new JSONModel([]), "oPermissions");
    this.getView()?.setModel(new JSONModel([]), "oWorkers");
    this.getView()?.setModel(new JSONModel([]), "oUserList");
    this.getView()?.setModel(new JSONModel([]), "oWorkersBackup");
  }

  private async callData(): Promise<void> {
    await this.oDataWorker();
    this.oDataUser();
    this.editableInfo();
    this.assignSwitchIds();
    this.setSwitchIds();
  }

  public editableInfo() {
    const edit = this.getView()?.getModel("oUserList") as JSONModel;

    const editableInfo: EditableInfo = {
      isEditable: false,
      isVisible: true,
    };

    edit.setData(editableInfo);
  }

  public testModels() {
    this.editableInfo();
  }

  //?Informacion del trabajador
  public oDataWorker() {
    BusyIndicator.show(0);

    this.callAjax({
      url: "/workers",
      type: "GET",
    })
      .then((newWorkers) => {
        const currentData = (
          this.getView()?.getModel("oWorkers") as JSONModel
        ).getData();

        const updatedData = [...currentData, ...newWorkers];

        (this.getView()?.getModel("oWorkers") as JSONModel).setData(
          updatedData
        );

        this.updateTableWorker();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        BusyIndicator.hide();
      });
  }

  private assignSwitchIds(): void {
    const oWorkersModel = this.getView()?.getModel("oWorkers") as JSONModel;
    const workersData = oWorkersModel.getProperty("/");

    workersData.forEach((worker: any) => {
      const workerId = worker.id;

      worker.billsPermission = `billsSwitch_${workerId}`;
      worker.usersPermission = `usersSwitch_${workerId}`;
      worker.salesPermission = `salesSwitch_${workerId}`;
      worker.inventoryPermission = `inventorySwitch_${workerId}`;
    });

    oWorkersModel.setProperty("/", workersData);
    alert(JSON.stringify(oWorkersModel.getProperty("/")));
  }

  public onAfterRendering(): void {
    this.updateTableWorker();
  }

  public updateTableWorker() {
    const oTable = this.getView()?.byId("tableWorkers") as Table;
    const oWorkersModel = this.getView()?.getModel("oWorkers") as JSONModel;

    oTable.setModel(oWorkersModel);
    // oTable.bindRows("oWorkers>/");
  }

  //?Informacion del usuario
  public oDataUser() {
    BusyIndicator.show(0);

    this.callAjax({
      url: "/users",
      type: "GET",
    })
      .then((oResult: any) => {
        (this.getView()?.getModel("oUser") as JSONModel).setData(oResult);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        BusyIndicator.hide();
      });
  }

  public onEdit() {
    const editButton = this.getView()?.byId("editInformation") as Button;
    const aceptChangesButton = this.getView()?.byId("aceptChanges") as Button;
    const cancelChangesButton = this.getView()?.byId("cancelChanges") as Button;

    //Copia de seguridad
    const oWorkersModel = this.getView()?.getModel("oWorkers") as JSONModel;
    const originalData = [...oWorkersModel.getProperty("/")];

    const oWorkersBackupModel = this.getView()?.getModel(
      "oWorkersBackup"
    ) as JSONModel;
    oWorkersBackupModel.setData([...originalData]);

    const oUsersListModel = this.getView()?.getModel("oUserList") as JSONModel;
    const editableData = oUsersListModel.getProperty("/");

    editableData.isEditable = true;
    oUsersListModel.setProperty("/0", editableData);

    if (editButton.getVisible() === true) {
      aceptChangesButton.setVisible(true);
      cancelChangesButton.setVisible(true);
      editButton.setVisible(false);
    } else {
      aceptChangesButton.setVisible(false);
      cancelChangesButton.setVisible(false);
      editButton.setVisible(true);
    }
  }

  public onCancelChanges() {
    const oWoerkersBackupModel = this.getView()?.getModel(
      "oWorkersBackup"
    ) as JSONModel;
    const originalData = oWoerkersBackupModel.getData();
    const oWorkersModel = this.getView()?.getModel("oWorkers") as JSONModel;
    oWorkersModel.setData(originalData);

    MessageBox.information("Cambios Cancelados");

    const editButton = this.getView()?.byId("editInformation") as Button;
    const aceptChangesButton = this.getView()?.byId("aceptChanges") as Button;
    const cancelChangesButton = this.getView()?.byId("cancelChanges") as Button;

    editButton.setVisible(true);
    aceptChangesButton.setVisible(false);
    cancelChangesButton.setVisible(false);

    const modelList = this.getView()?.getModel("oUserList") as JSONModel;
    modelList.setProperty("/0/isEditable", false);

    const oUserListModel = this.getView()?.getModel("oUserList") as JSONModel;
    const editableData = oUserListModel.getProperty("/0");

    editableData.isEditable = false;

    oUserListModel.setProperty("/0", editableData);

    oWoerkersBackupModel.setData([]);
  }

  public async updateWorker(worker: any) {
    const workerId = worker.id;

    await this.callAjax({
      url: `/workers/${workerId}`,
      type: "POST",
      data: worker,
    });
  }

  public clearBackupData() {
    const oWorkersBackupModel = this.getView()?.getModel(
      "oWorkersBackup"
    ) as JSONModel;
    oWorkersBackupModel.setData([]);
  }

  public setSwitchIds() {
    const oWorkersModel = this.getView()?.getModel("oWorkers") as JSONModel;
    const workersData = oWorkersModel.getProperty("/");

    workersData.forEach((worker: any) => {
      worker.billsSwitchId = "billsSwitch_" + worker.id;
      worker.usersSwitchId = "usersSwitch_" + worker.id;
      worker.salesSwitchId = "salesSwitch_" + worker.id;
      worker.inventorySwitchId = "inventorySwitch_" + worker.id;
    });

    oWorkersModel.setProperty("/", workersData);
  }

  public async onAceptChanges() {
    const oWorkersModel = this.getView()?.getModel("oWorkers") as JSONModel;
    const updatedData = oWorkersModel.getProperty("/");

    try {
      for (const worker of updatedData) {
        const salesSwitchId = `salesSwitch_${worker.id}`;
        const inventorySwitchId = `inventorySwitch_${worker.id}`;
        const userssSwitchId = `usersSwitch_${worker.id}`;
        const billsSwitchId = `billsSwitch_${worker.id}`;

        const dataToSend = {
          ...worker,
          salesPermission: (
            this.getView()?.byId(salesSwitchId) as Switch
          ).getState(),
          inventoryPermission: (
            this.getView()?.byId(inventorySwitchId) as Switch
          ).getState(),
          usersPermission: (
            this.getView()?.byId(userssSwitchId) as Switch
          ).getState(),
          billsPermission: (
            this.getView()?.byId(billsSwitchId) as Switch
          ).getState(),
        };

        await this.updateWorker(dataToSend);
      }

      MessageBox.success("Cambios Guardados correctamente");
      this.clearBackupData();

      const editButton = this.getView()?.byId("editInformation") as Button;
      const aceptChangesButton = this.getView()?.byId("aceptChanges") as Button;
      const cancelChangesButton = this.getView()?.byId(
        "cancelChanges"
      ) as Button;

      editButton.setVisible(true);
      aceptChangesButton.setVisible(false);
      cancelChangesButton.setVisible(false);

      const modelList = this.getView()?.getModel("oUserList") as JSONModel;
      modelList.setProperty("/0/isEditable", false);

      const oUserListModel = this.getView()?.getModel("oUserList") as JSONModel;
      const editableData = oUserListModel.getProperty("/0");

      editableData.isEditable = false;

      oUserListModel.setProperty("/0", editableData);
    } catch (error) {
      MessageBox.error(
        `No se pudieron realizar los cambios: ${JSON.stringify(error)}`
      );
    }
  }

  public cancelUpdateUser() {
    const modelList = this.getView()?.getModel("oUserList") as JSONModel;
    const editableProperty = modelList.getProperty("/0/isEditable");

    modelList.setProperty("/0/isEditable", !editableProperty);
  }

  public goToUsersPage() {
    this.getRouter().navTo("RouteUsers");
  }
}

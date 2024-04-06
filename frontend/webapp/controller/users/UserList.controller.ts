import JSONModel from "sap/ui/model/json/JSONModel";
import Base from "../Base.controller";
import Button from "sap/m/Button";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import { EditableInfo } from "../../interfaces/editable.interfaz";
import Table from "sap/ui/table/Table";
import MessageBox from "sap/m/MessageBox";
import Dialog from "sap/m/Dialog";
import Text from "sap/m/Text";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class UserList extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  private previousWorkers(): any {}

  private areEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  public onInit(): void {
    this.initModels();
    this.callData();
    this.loadWorkerData();

    sap.ui
      .getCore()
      .getEventBus()
      .subscribe(
        "updateTableWorker",
        "updateTableWorker",
        this.updateTableWorker,
        this
      );
  }

  public onAfterRendering(): void {
    this.loadWorkerData();
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
    this.updateUserTable();
  }

  private async loadWorkerData(): Promise<void> {
    try {
      BusyIndicator.show(0);

      const workerList = await this.callAjax({
        url: "/workers",
        method: "GET",
      });

      const oWorkerModel = this.getView()?.getModel("oWorkers") as JSONModel;
      oWorkerModel.setData(workerList);

      this.updateTableWorker();
    } catch (error) {
      MessageBox.error(
        `Error al cargar los datos de los trabajadores: ${JSON.stringify(
          error
        )}`
      );
    } finally {
      BusyIndicator.hide();
    }
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

  public updateTableWorker() {
    const oTable = this.getView()?.byId("tableWorkers") as Table;
    const oWorkersModel = this.getView()?.getModel("oWorkers") as JSONModel;

    if (oTable && oWorkersModel) {
      oTable.setModel(oWorkersModel);
    } else {
      // alert("Error: Table or Workers Model is undefined");
    }
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
    const deleteWorkersButton = this.getView()?.byId("deleteWorkers") as Button;

    //Copia de seguridad
    const oWorkersModel = this.getView()?.getModel("oWorkers") as JSONModel;
    const originalData = oWorkersModel.getData();

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
      deleteWorkersButton.setVisible(true);
      editButton.setVisible(false);
    } else {
      aceptChangesButton.setVisible(false);
      cancelChangesButton.setVisible(false);
      deleteWorkersButton.setVisible(false);
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
    const deleteWorkersButton = this.getView()?.byId("deleteWorkers") as Button;

    editButton.setVisible(true);
    aceptChangesButton.setVisible(false);
    cancelChangesButton.setVisible(false);
    deleteWorkersButton.setVisible(false);

    const modelList = this.getView()?.getModel("oUserList") as JSONModel;
    modelList.setProperty("/0/isEditable", false);

    const oUserListModel = this.getView()?.getModel("oUserList") as JSONModel;
    const editableData = oUserListModel.getProperty("/0");

    editableData.isEditable = false;

    oUserListModel.setProperty("/0", editableData);

    oWoerkersBackupModel.setData([]);
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
    const updatedData = oWorkersModel.getData();

    try {
      await Promise.all(
        updatedData.map(async (worker: any) => {
          const workerId = worker.idWorker;

          await this.callAjax({
            url: `/workers/${workerId}`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(worker),
          });
        })
      );

      oWorkersModel.refresh(true);
      this.updateTableWorker();

      MessageBox.success("Cambios Guardados correctamente");
      this.clearBackupData();

      const editButton = this.getView()?.byId("editInformation") as Button;
      const aceptChangesButton = this.getView()?.byId("aceptChanges") as Button;
      const cancelChangesButton = this.getView()?.byId(
        "cancelChanges"
      ) as Button;
      const deleteWorkersButton = this.getView()?.byId(
        "deleteWorkers"
      ) as Button;

      editButton.setVisible(true);
      aceptChangesButton.setVisible(false);
      cancelChangesButton.setVisible(false);
      deleteWorkersButton.setVisible(false);

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

  //?Eliminar trabajador
  public onDeleteWorker(oEvent: any) {
    const oSelectedWorker = oEvent
      .getSource()
      .getBindingContext("oWorkers")
      .getObject();

    const dialog = new Dialog({
      title: "Eliminar Trabajador",
      type: "Message",
      content: new Text({
        text: `¿Está seguro de que desea eliminar al trabajador ${oSelectedWorker.user.firstName} ${oSelectedWorker.user.lastName}?`,
      }),
      beginButton: new Button({
        text: "Aceptar",
        press: () => {
          this.deleteWorker(oSelectedWorker.idWorker);
          dialog.close();
        },
      }),
      endButton: new Button({
        text: "Cancelar",
        press: () => {
          dialog.close();
        },
      }),
      afterClose: () => {
        dialog.destroy();
      },
    });

    dialog.open();
  }

  public async deleteWorker(workerId: string) {
    try {
      await this.callAjax({
        url: `/workers/${workerId}`,
        type: "DELETE",
      });

      const oWorkersModel = this.getView()?.getModel("oWorkers") as JSONModel;
      const workersData = oWorkersModel
        .getData()
        .filter((worker: any) => worker.idWorker !== workerId);
      oWorkersModel.setData(workersData);
      oWorkersModel.refresh(true);

      MessageBox.success("Trabajador eliminado correctamente");
    } catch (error) {
      MessageBox.error(
        `No se pudo eliminar al trabajador: ${JSON.stringify(error)}`
      );
    }
  }

  private async updateUserTable() {
    try {
      const workerList = await this.callAjax({
        url: "/workers",
        method: "GET",
      });

      const oWorkerModel = this.getView()?.getModel("oWorkers") as JSONModel;
      oWorkerModel.setData(workerList);

      this.updateTableWorker();
    } catch (error) {
      // alert("Error");
      // alert(JSON.stringify(error));
    }
  }

  public onDeleteSelectedWorkers(): void {
    const oTable = this.getView()?.byId("tableWorkers") as Table;
    const aSelectedIndices = oTable.getSelectedIndices();
    const aSelectedWorkers: any[] = [];

    aSelectedIndices.forEach((index: number) => {
      const oContext = oTable.getContextByIndex(index);
      if (oContext) {
        const oWorker = oContext.getObject();
        aSelectedWorkers.push(oWorker);
      }
    });

    if (aSelectedWorkers.length === 0) {
      MessageBox.warning("No se han seleccionado trabajadores para eliminar.");
      return;
    }

    const dialog = new Dialog({
      title: "Eliminar Trabajadores",
      type: "Message",
      content: new Text({
        text: `¿Está seguro de que desea eliminar ${aSelectedWorkers.length} trabajadores seleccionados?`,
      }),
      beginButton: new Button({
        text: "Aceptar",
        press: () => {
          this.deleteSelectedWorkers(aSelectedWorkers);
          dialog.close();
        },
      }),
      endButton: new Button({
        text: "Cancelar",
        press: () => {
          dialog.close();
        },
      }),
      afterClose: () => {
        dialog.destroy();
      },
    });

    dialog.open();
  }

  public async deleteSelectedWorkers(selectedWorkers: any[]): Promise<void> {
    const aWorkerIds = selectedWorkers.map((worker) => worker.idWorker);

    try {
      await Promise.all(
        aWorkerIds.map((workerId) => this.deleteWorker(workerId))
      );
      MessageBox.success("Trabajadores eliminados correctamente");
    } catch (error) {
      MessageBox.error(
        `Error al eliminar trabajadores: ${JSON.stringify(error)}`
      );
    }
  }
}

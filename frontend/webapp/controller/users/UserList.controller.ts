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
  public onInit(): void {
    this.initModels();
    this.callData();
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

  public onAfterRendering(): void {
    this.updateTableWorker();
  }

  public updateTableWorker() {
    const oTable = this.getView()?.byId("tableWorkers") as Table;
    const oWorkersModel = this.getView()?.getModel("oWorkers") as JSONModel;

    oTable.setModel(oWorkersModel);
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

  public clearBackupData() {
    const oWorkersBackupModel = this.getView()?.getModel(
      "oWorkersBackup"
    ) as JSONModel;
    oWorkersBackupModel.setData([]);
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

  //?Eliminar trabajador
  public onDeleteWorker(oEvent: any) {
    const oSelectedWorker = oEvent.getSource().getBindingContext("oWorkers").getObject();

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

      MessageBox.success("Trabajador eliminado correctamente");
    } catch (error) {
      MessageBox.error(
        `No se pudo eliminar al trabajador: ${JSON.stringify(error)}`
      );
    }
  }
}

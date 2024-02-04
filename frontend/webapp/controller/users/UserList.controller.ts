import JSONModel from "sap/ui/model/json/JSONModel";
import Base from "../Base.controller";
import Button from "sap/m/Button";
import Dialog from "sap/m/Dialog";
import Text from "sap/m/Text";
import Bar from "sap/m/Bar";
import Title from "sap/m/Title";
import FlexBox from "sap/m/FlexBox";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import { EditableInfo } from "../../interfaces/editable.interfaz";
import Table from "sap/ui/table/Table";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class UserList extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    this.getView()?.setModel(new JSONModel([]), "oUser");
    this.getView()?.setModel(new JSONModel([]), "oPermissions");
    this.getView()?.setModel(new JSONModel([]), "oWorkers");

    this.getView()?.setModel(new JSONModel([]), "oUserList");

    this.callData();
    this.updateTableWorker();
  }

  public async callData() {
    await this.oDataWorker();
    this.oDataUser();
    this.editableInfo();
    //!Esto se usa para revisar la informacion de los modelos
    // await this.testModels();
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

    const pruebaUser = this.getView()?.getModel("oUser");

    const purebaTrabajador = this.getView()?.getModel("oWorkers");
    alert(JSON.stringify(purebaTrabajador?.getProperty("/")));

    if (editButton.getVisible() === true) {
      aceptChangesButton.setVisible(true);
      cancelChangesButton.setVisible(true);
      editButton.setVisible(false);
    } else {
      aceptChangesButton.setVisible(false);
      cancelChangesButton.setVisible(false);
      editButton.setVisible(true);
    }

    const modelList = this.getView()?.getModel("oUserList") as JSONModel;
    const editableProperty = modelList.getProperty("/");

    modelList.setProperty("/0/isEditable", !editableProperty);
  }

  public onCancelChanges() {
    const editButton = this.getView()?.byId("editInformation") as Button;
    const aceptChangesButton = this.getView()?.byId("aceptChanges") as Button;
    const cancelChangesButton = this.getView()?.byId("cancelChanges") as Button;

    if (cancelChangesButton.getVisible() === true) {
      aceptChangesButton.setVisible(false);
      cancelChangesButton.setVisible(false);
      editButton.setVisible(true);
    } else {
      aceptChangesButton.setVisible(true);
      cancelChangesButton.setVisible(true);
      editButton.setVisible(false);
    }

    const modelList = this.getView()?.getModel("oUserList") as JSONModel;
    const editableProperty = modelList.getProperty("/0/isEditable");

    modelList.setProperty("/0/isEditable", !editableProperty);
  }

  public onAceptChanges() {
    const oDialog = new Dialog({
      showHeader: true,
      customHeader: new Bar({
        contentLeft: new Title({
          text: "Realizar cambios",
        }),
      }),
      content: [
        new FlexBox({
          alignItems: "Center",
          justifyContent: "Center",
          alignContent: "Center",
          items: new Text({
            text: "¿Deseas realizar los cambios?",
            textAlign: "Center",
          }),
        }),
      ],
      beginButton: new Button({
        text: "Aceptar",
        press: function () {
          oDialog.close();
        },
      }),
      endButton: new Button({
        text: "Cancelar",
        press: function () {
          oDialog.close();
        },
      }),
    });

    oDialog.open();
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

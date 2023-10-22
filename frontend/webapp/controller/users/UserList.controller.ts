import JSONModel from "sap/ui/model/json/JSONModel";
import {
  getListPosition,
  getModelUsers,
  listPosition,
  structureUserCreate,
} from "../../model/models";
import Base from "../Base.controller";
import Button from "sap/m/Button";
import Dialog from "sap/m/Dialog";
import Text from "sap/m/Text";
import Bar from "sap/m/Bar";
import Title from "sap/m/Title";
import FlexBox from "sap/m/FlexBox";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class UserList extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    this.getView()?.setModel(getModelUsers(), "oUserList");
    this.getView()?.setModel(getListPosition(), "oListPosition");

    structureUserCreate();
    listPosition();
  }

  public onEdit() {
    const editButton = this.getView()?.byId("editInformation") as Button;
    const aceptChangesButton = this.getView()?.byId("aceptChanges") as Button;
    const cancelChangesButton = this.getView()?.byId("cancelChanges") as Button;

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
    const editableProperty = modelList.getProperty("/0/isEditable");

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
}

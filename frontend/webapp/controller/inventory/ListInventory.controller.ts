import Button from "sap/m/Button";
import {
  getInventoryControl,
  getListStorage,
  listStorage,
  structureInventory,
} from "../../model/models";
import Base from "../Base.controller";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class ListInventory extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    this.getView()?.setModel(getInventoryControl(), "oInventoryControl");
    this.getView()?.setModel(getListStorage(), "oListStorage");

    structureInventory();
    listStorage();
  }

  public editInformation() {
    const editButton = this.getView()?.byId("editList") as Button;
    const visibleButton = editButton.getVisible();

    const aceptChanges = this.getView()?.byId("aceptChanges") as Button;
    const cancelChanges = this.getView()?.byId("cancelChanges") as Button;

    if (visibleButton) {
      editButton.setVisible(false);
      aceptChanges.setVisible(true);
      cancelChanges.setVisible(true);
    } else {
      editButton.setVisible(true);
      aceptChanges.setVisible(false);
      cancelChanges.setVisible(false);
    }

    const inventoryModel = this.getView()?.getModel(
      "oInventoryControl"
    ) as JSONModel;
    const inventoryProperty = inventoryModel.getProperty("/0/isEdit");

    inventoryModel.setProperty("/0/isEdit", !inventoryProperty);
  }

  public aceptChanges() {
    const aceptChanges = this.getView()?.byId("aceptChanges") as Button;
    const cancelChanges = this.getView()?.byId("cancelChanges") as Button;
    const editButton = this.getView()?.byId("editList") as Button;
  }

  public cancelChanges() {
    const cancelChanges = this.getView()?.byId("cancelChanges") as Button;
    const visibleButton = cancelChanges.getVisible();

    const aceptChanges = this.getView()?.byId("aceptChanges") as Button;
    const editButton = this.getView()?.byId("editList") as Button;

    if (visibleButton) {
      editButton.setVisible(true);
      aceptChanges.setVisible(false);
      cancelChanges.setVisible(false);
    } else {
      editButton.setVisible(false);
      aceptChanges.setVisible(true);
      cancelChanges.setVisible(true);
    }

    const inventoryModel = this.getView()?.getModel(
      "oInventoryControl"
    ) as JSONModel;
    const inventoryProperty = inventoryModel.getProperty("/0/isEdit");

    inventoryModel.setProperty("/0/isEdit", !inventoryProperty);
  }
}

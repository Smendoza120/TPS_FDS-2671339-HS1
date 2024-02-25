import Button from "sap/m/Button";
import { getInventoryControl } from "../../model/models";
import Base from "../Base.controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class ListInventory extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public async onInit(): Promise<void> {
    this.getView()?.setModel(getInventoryControl(), "oInventoryControl");
    this.getView()?.setModel(new JSONModel([]), "oListStorage");
    this.getView()?.setModel(new JSONModel([]), "dataSelectStorage");

    this.loadInventoryData();
    this.setDataSelectStorage();
  }

  onAfterRendering(): void {
    this.loadInventoryData();
    this.setDataSelectStorage();
  }

  async setDataSelectStorage(): Promise<void> {
    const selectStorageModel = this.getView()?.getModel(
      "dataSelectStorage"
    ) as JSONModel;

    const dataStoage = [
      {
        key: "1",
        text: "Almacen",
      },
      {
        key: "2",
        text: "Bodega",
      },
    ];

    selectStorageModel.setData(dataStoage);
  }

  public prueba(): any {
    const prueba = (
      this.getView()?.getModel("dataSelectStorage") as JSONModel
    ).getData();

    alert(JSON.stringify(prueba));
  }

  public async oDeleteProduct(productId: string): Promise<void> {
    BusyIndicator.show(0);

    this.callAjax({
      url: `/products/${productId}`,
      method: "DELETE",
    })
      .then(() => {
        alert(productId);
        const inventoryModel = this.getView()?.getModel(
          "oListStorage"
        ) as JSONModel;
        const inventoryData = inventoryModel.getData();
        const updatedProducts = inventoryData.products.filter(
          (product: any) => product.idProduct !== productId
        );
        inventoryData.products = updatedProducts;
        inventoryModel.setData(inventoryData);

        MessageBox.success("Producto eliminado correctamente");
      })
      .catch((error) => {
        alert(productId[0]);
        MessageBox.error(
          `Error al eliminar el producto: ${JSON.stringify(error)}`
        );
      })
      .finally(() => {
        BusyIndicator.hide();
      });
  }

  private async loadInventoryData(): Promise<void> {
    try {
      BusyIndicator.show(0);

      const productsList = await this.callAjax({
        url: "/inventory",
        method: "GET",
      });

      const inventoryModel = this.getView()?.getModel(
        "oListStorage"
      ) as JSONModel;

      inventoryModel.setData(productsList);
    } catch (error) {
      alert(`Error al cargar los datos de inventario: ${error}`);
    } finally {
      BusyIndicator.hide();
    }
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

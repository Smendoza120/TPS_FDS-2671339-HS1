import Button from "sap/m/Button";
import { getInventoryControl } from "../../model/models";
import Base from "../Base.controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import MessageBox from "sap/m/MessageBox";
import Table from "sap/ui/table/Table";
import Column from "sap/ui/table/Column";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class ListInventory extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public async onInit(): Promise<void> {
    this.getView()?.setModel(getInventoryControl(), "oInventoryControl");
    this.getView()?.setModel(new JSONModel([]), "oListStorage");
    this.getView()?.setModel(new JSONModel([]), "oVisibility");
    this.getView()?.setModel(new JSONModel([]), "dataSelectStorage");

    this.loadInventoryData();
    this.setDataSelectStorage();
    this.setDataVisibleAndEditableModel();
  }

  onAfterRendering(): void {
    this.loadInventoryData();
    this.setDataSelectStorage();
    this.setDataVisibleAndEditableModel();
  }

  setDataVisibleAndEditableModel(): void {
    const visibilityModel = this.getView()?.getModel(
      "oVisibility"
    ) as JSONModel;
    const structureModel = {
      isVisible: false,
      isEditable: false,
    };

    visibilityModel.setData(structureModel);
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
      this.getView()?.getModel("oVisibility") as JSONModel
    ).getData();

    alert(JSON.stringify(prueba));
  }

  public async onDeleteProductFromRow(oEvent: any): Promise<void> {
    const productId = oEvent
      .getSource()
      .getBindingContext("oListStorage")
      .getObject();

    if (productId) {
      try {
        alert(`productId ${JSON.stringify(productId.idProduct)}`);
        await this.oDeleteProduct(productId.idProduct);
      } catch (error) {
        MessageBox.error(
          `Error al eliminar el producto: ${JSON.stringify(error)}`
        );
      }
    } else {
      MessageBox.error("No se pudo obtener el ID del producto.");
    }
  }

  public async oDeleteProduct(productId: string): Promise<void> {
    try {
      BusyIndicator.show(0);
      await this.callAjax({
        type: "DELETE",
        url: `/products/${productId}`,
      });

      const oProductModel = this.getView()?.getModel(
        "oListStorage"
      ) as JSONModel;
      const productData = oProductModel
        .getData()
        .filter((product: any) => product.idProduct !== productId);

      oProductModel.setData(productData);
      oProductModel.refresh(true);

      MessageBox.success("Producto eliminado correctamente");
    } catch (error) {
      alert(`Error: ${productId}`);
      MessageBox.error(
        `Error al eliminar el producto: ${JSON.stringify(error)}`
      );
    } finally {
      BusyIndicator.hide();
    }
  }

  private async loadInventoryData(): Promise<void> {
    try {
      BusyIndicator.show(0);

      const productsList = await this.callAjax({
        url: "/products",
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

  public editInformation(): void {
    const editButton = this.getView()?.byId("editList") as Button;
    const aceptChangesButton = this.getView()?.byId("aceptChanges") as Button;
    const cancelChangesButton = this.getView()?.byId("cancelChanges") as Button;
    const deleteColumn = this.getView()?.byId("deleteColumn") as Column;
    const visibilityModel = this.getView()?.getModel(
      "oVisibility"
    ) as JSONModel;

    // Copia de seguridad
    const originalVisibilityState = visibilityModel.getData();
    const backupVisibilityState = { ...originalVisibilityState };
    visibilityModel.setData(backupVisibilityState);

    // Cambiar el estado de edición
    const isEditable = visibilityModel.getProperty("/isEditable");
    visibilityModel.setProperty("/isEditable", !isEditable);

    // Cambiar la visibilidad de los botones y la columna de eliminación
    if (editButton.getVisible() === true) {
      editButton.setVisible(false);
      aceptChangesButton.setVisible(true);
      cancelChangesButton.setVisible(true);
      deleteColumn.setVisible(true);
    } else {
      editButton.setVisible(true);
      aceptChangesButton.setVisible(false);
      cancelChangesButton.setVisible(false);
      deleteColumn.setVisible(false);
    }
  }

  public async aceptChanges() {
    try {
      const productsModel = this.getView()?.getModel(
        "oListStorage"
      ) as JSONModel;
      const updatedData = productsModel.getData();

      await Promise.all(
        updatedData.map(async (product: any) => {
          const productId = product.idProduct;

          const price = parseFloat(product.price);
          const quantity = parseInt(product.quantity);
          const date = product.purchaseDate

          alert(date)


          if (isNaN(price) || isNaN(quantity)) {
            throw new Error(
              "El precio y la cantidad deben ser números válidos."
            );
          }

          const updatedProduct = {
            ...product,
            price: price,
            quantity: quantity,
          };

          alert(productId)
          alert(JSON.stringify(product));
          alert(JSON.stringify(updatedProduct));

          await this.callAjax({
            url: `/products/${productId}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(updatedProduct),
          });
        })
      );

      productsModel.refresh(true);

      const visibilityModel = this.getView()?.getModel(
        "oVisibility"
      ) as JSONModel;
      const visibilityData = visibilityModel.getData();

      if (!visibilityData.isEditable) {
        MessageBox.information("No hay cambios pendientes.");
        return;
      }

      visibilityData.isEditable = false;
      visibilityModel.setData(visibilityData);

      MessageBox.success("Cambios guardados correctamente.");

      const editButton = this.getView()?.byId("editList") as Button;
      const aceptChangesButton = this.getView()?.byId("aceptChanges") as Button;
      const cancelChangesButton = this.getView()?.byId(
        "cancelChanges"
      ) as Button;
      const deleteColumn = this.getView()?.byId("deleteColumn") as Column;

      editButton.setVisible(true);
      aceptChangesButton.setVisible(false);
      cancelChangesButton.setVisible(false);
      deleteColumn.setVisible(false);
    } catch (error) {
      MessageBox.error(
        `No se pudieron realizar los cambios: ${JSON.stringify(error)}`
      );
    }
  }

  public cancelChanges() {
    const visibilityModel = this.getView()?.getModel(
      "oVisibility"
    ) as JSONModel;
    const originalVisibilityState = visibilityModel.getData();

    // Restaurar el estado original
    originalVisibilityState.isEditable = false;
    visibilityModel.setData(originalVisibilityState);

    // Restaurar la visibilidad de los botones y la columna de eliminación
    const editButton = this.getView()?.byId("editList") as Button;
    const aceptChangesButton = this.getView()?.byId("aceptChanges") as Button;
    const cancelChangesButton = this.getView()?.byId("cancelChanges") as Button;
    const deleteColumn = this.getView()?.byId("deleteColumn") as Column;

    editButton.setVisible(true);
    aceptChangesButton.setVisible(false);
    cancelChangesButton.setVisible(false);
    deleteColumn.setVisible(false);
  }
}

import MessageBox from "sap/m/MessageBox";

import Base from "../Base.controller";
import Select from "sap/m/Select";
import Input from "sap/m/Input";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class InventoryControl extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    this.getView()?.setModel(new JSONModel([]), "oListStorage");
    this.getView()?.setModel(new JSONModel([]), "dataSelectStorage");

    this.setDataSelectStorage();
  }

  onAfterRendering(): void {
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

  public createInventory(inventoryData: any): Promise<string> {
    BusyIndicator.show(0);

    return new Promise<string>((resolve, reject) => {
      this.callAjax({
        type: "POST",
        url: "/inventory",
        contentType: "application/json",
        data: JSON.stringify(inventoryData),
      })
        .then((response) => {
          if (JSON.stringify(response) && JSON.stringify(response.id)) {
            resolve(JSON.stringify(response.id));
          } else {
            reject(new Error("No se pudo obtener el ID del inventario."));
          }
        })
        .catch((error) => {
          reject(
            new Error(`Error al crear el inventario: ${JSON.stringify(error)}`)
          );
        })
        .finally(() => {
          BusyIndicator.hide();
        });
    });
  }

  private async getInventory(): Promise<void> {
    try {
      const existingInventory = await this.callAjax({
        type: "GET",
        url: "/inventory",
      });

      return existingInventory[0].idInventory;
    } catch (error) {
      throw new Error(
        `Error al obtener o crear el inventario: ${JSON.stringify(error)}`
      );
    }
  }

  public async createProduct(productData: any): Promise<void> {
    BusyIndicator.show(0);

    this.callAjax({
      type: "POST",
      url: "/products",
      contentType: "application/json",
      data: JSON.stringify(productData),
    })
      .then(async (response) => {
        if (response) {
          this.updateProductModel()
          MessageBox.success("Producto creado exitosamente");
        } else {
          MessageBox.error("La creación del producto falló");
        }
      })
      .catch((error) => {
        MessageBox.error("La creación del producto falló");
      })
      .finally(() => {
        BusyIndicator.hide();
      });
  }

  private clearFormFields(): void {
    const productNameInput = this.getView()?.byId("productNameInput") as Input;
    const quantityInput = this.getView()?.byId("quantityInput") as Input;
    const priceInput = this.getView()?.byId("priceInput") as Input;

    productNameInput.setValue("");
    quantityInput.setValue("");
    priceInput.setValue("");
  }

  public async onCreateProduct(): Promise<void> {
    try {
      const productNameInput = this.getView()?.byId(
        "productNameInput"
      ) as Input;
      const quantityInput = this.getView()?.byId("quantityInput") as Input;
      const princeInput = this.getView()?.byId("priceInput") as Input;
      const storageSelect = this.getView()?.byId("storageSelect") as Select;

      const productName = productNameInput.getValue();
      const quantity = parseInt(quantityInput.getValue());
      const price = parseFloat(princeInput.getValue());
      const storage = storageSelect.getSelectedItem()?.getText();

      const currentDate = new Date();
      const purchaseDate = currentDate.toISOString().slice(0, 10);

      const inventory_id = await this.getInventory();

      const newProduct = {
        productName: productName,
        price: price,
        quantity: quantity,
        purchaseDate: purchaseDate,
        storage: storage,
        inventory_id: inventory_id,
      };

      this.createProduct(newProduct);
      this.clearFormFields();
    } catch (error) {
      MessageBox.error(`Error al crear el producto: ${error}`);
    }
  }

  private async updateProductModel(): Promise<void> {
    try {
      sap.ui
        .getCore()
        .getEventBus()
        .publish("loadInventoryData", "loadInventoryData");
    } catch (error) {}
  }
}

import MessageBox from "sap/m/MessageBox";
import { getListStorage, listStorage } from "../../model/models";
import Base from "../Base.controller";
import Select from "sap/m/Select";
import Input from "sap/m/Input";
import BusyIndicator from "sap/ui/core/BusyIndicator";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class InventoryControl extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    this.getView()?.setModel(getListStorage(), "oListStorage");

    listStorage();
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
            alert(response.id);
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

  public createProduct(productData: any): Promise<void> {
    BusyIndicator.show(0);

    return new Promise<void>((resolve, reject) => {
      this.callAjax({
        type: "POST",
        url: "/products",
        contentType: "application/json",
        data: JSON.stringify(productData),
      })
        .then((response) => {
          if (response && response.success) {
            resolve();
          } else {
            reject(new Error("La creación del producto falló"));
          }
        })
        .catch((error) => {
          reject(
            new Error(`Error al crear el producto: ${JSON.stringify(error)}`)
          );
        })
        .finally(() => {
          BusyIndicator.hide();
        });
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
      const storageComboBox = this.getView()?.byId("storageComboBox") as Select;
      const selectedItem = storageComboBox.getSelectedItem();

      if (!selectedItem) {
        MessageBox.error("Seleccione un almacenamiento");
        return;
      }

      const selectedText = selectedItem.getText();

      const productNameInput = this.getView()?.byId(
        "productNameInput"
      ) as Input;
      const quantityInput = this.getView()?.byId("quantityInput") as Input;
      const priceInput = this.getView()?.byId("priceInput") as Input;

      const productName = productNameInput.getValue();

      const quantityStr = quantityInput.getValue();
      const quantity = parseInt(quantityStr);

      const priceStr = priceInput.getValue();
      const price = parseFloat(priceStr);

      const currentDate = new Date();

      alert(currentDate);
      const purchaseDate = currentDate.toISOString().slice(0, 10);
      alert(purchaseDate);
      const ineventoryId = await this.createInventory({
        storage: selectedText,
      });

      const newProduct = {
        productName: productName,
        price: price,
        quantity: quantity,
        purchaseDate: purchaseDate,
        inventory_id: ineventoryId,
      };

      await this.createProduct(newProduct);

      this.clearFormFields();
    } catch (error) {
      alert("Error funcion onCreateProduct");
      MessageBox.error(`Error al crear el producto: ${error}`);
    }
  }
}

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

  public async createInventoryAndProduct(productData: any): Promise<void> {
    try {
      BusyIndicator.show(0);

      const inventoryData = {
        storage: productData.storageName,
      };

      const inventoryId = await this.createInventory(inventoryData);

      productData.inventory_id = inventoryId;

      await this.createProduct(productData);

      MessageBox.success("Producto creado exitosamente");

      this.clearFormFields();
    } catch (error) {
      alert("Crear inventario y producto");
      MessageBox.error("Crear inventario y producto");
      MessageBox.error(`Error al crear el producto: ${error}`);
      MessageBox.error(`Error al crear el producto: ${JSON.stringify(error)}`);
    } finally {
      BusyIndicator.hide();
    }
  }

  public async createInventory(inventoryData: any): Promise<void> {
    try {
      BusyIndicator.show(0);
      const response = await this.callAjax({
        type: "POST",
        url: "/inventory",
        contentType: "application/json",
        data: JSON.stringify(inventoryData),
      });

      return response.inventory_id;
    } catch (error) {
    } finally {
      BusyIndicator.hide();
    }
  }

  public async createProduct(productData: any): Promise<void> {
    try {
      BusyIndicator.show(0);
      await this.callAjax({
        type: "POST",
        url: "/products",
        contentType: "application/json",
        data: JSON.stringify(productData),
      });
    } catch (error) {
      alert("Crear producto");
      throw new Error(`Error al crear el producto: ${JSON.stringify(error)}`);
    } finally {
      BusyIndicator.hide();
    }
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
      const selectedKey = storageComboBox.getSelectedKey();

      if (!selectedKey) {
        MessageBox.error("Seleccione un almacenamiento");
        return;
      }

      const productNameInput = this.getView()?.byId(
        "productNameInput"
      ) as Input;
      const quantityInput = this.getView()?.byId("quantityInput") as Input;
      const priceInput = this.getView()?.byId("priceInput") as Input;

      const productName = productNameInput.getValue();
      const quantity = quantityInput.getValue();
      const price = priceInput.getValue();

      const newProduct = {
        productName,
        quantity,
        price,
        storageName: selectedKey,
      };

      await this.createInventoryAndProduct(newProduct);
    } catch (error) {
      alert("Error funcion");
      MessageBox.error(`Error al crear el producto: ${error}`);
    }
  }
}

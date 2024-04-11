import Button from "sap/m/Button";
import { getInventoryControl } from "../../model/models";
import Base from "../Base.controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import MessageBox from "sap/m/MessageBox";
import Table from "sap/ui/table/Table";
import Column from "sap/ui/table/Column";
import Dialog from "sap/m/Dialog";
import Text from "sap/m/Text";
import Label from "sap/m/Label";
import Input from "sap/m/Input";
import Core from "sap/ui/core/Core";
import FlexBox from "sap/m/FlexBox";
import SearchField from "sap/m/SearchField";
import Select from "sap/m/Select";

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

    sap.ui
      .getCore()
      .getEventBus()
      .subscribe(
        "loadInventoryData",
        "loadInventoryData",
        this.loadInventoryData,
        this
      );

    this.loadInventoryData();
    this.setDataSelectStorage();
    this.setDataVisibleAndEditableModel();
    this.setDefaultStorageSelection();
  }

  onAfterRendering(): void {
    sap.ui
      .getCore()
      .getEventBus()
      .subscribe(
        "loadInventoryData",
        "loadInventoryData",
        this.loadInventoryData,
        this
      );

    this.loadInventoryData();
    this.setDataSelectStorage();
    this.setDataVisibleAndEditableModel();
    this.setDefaultStorageSelection();
  }

  private setDefaultStorageSelection(): void {
    const table = this.getView()?.byId("productsTable") as Table;
    const rowsBinding = table.getBinding("rows");

    if (rowsBinding) {
      rowsBinding.attachEventOnce("dataReceived", () => {
        const rows = table.getRows();

        rows.forEach((row: any) => {
          const cells = row.getCells();

          const productId = cells[0].getValue(); // Ajusta el índice según la columna que contenga el ID del producto
          const storageValue = this.getStorageValue(productId);

          if (storageValue) {
            const select = cells[4].getContent()[0] as Select; // Ajusta el índice según la columna que contiene el Select
            const selectItems = select.getItems();
            const selectedItem = selectItems.find(
              (item) => item.getKey() === storageValue
            );

            if (selectedItem) {
              select.setSelectedKey(selectedItem.getKey());
            }
          }
        });
      });
    }
  }

  private getStorageValue(productId: string): string | undefined {
    const storageModel = this.getView()?.getModel("oListStorage") as JSONModel;
    const productsData = storageModel.getData();
    const product = productsData.find((p: any) => p.idProduct === productId);

    return product?.storage;
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

      // MessageBox.success("Producto eliminado correctamente");
    } catch (error) {
      MessageBox.error(
        `Error al eliminar el producto: ${JSON.stringify(error)}`
      );
    } finally {
      BusyIndicator.hide();
    }
  }

  public async onDeleteProductFromRow(oEvent: any): Promise<void> {
    const productId = oEvent
      .getSource()
      .getBindingContext("oListStorage")
      .getObject().idProduct;


    if (productId) {
      try {
        await this.oDeleteProduct(productId);
        MessageBox.success("Producto eliminado correctamente");
      } catch (error) {
        MessageBox.error(
          `Error al eliminar el producto: ${JSON.stringify(error)}`
        );
      }
    } else {
      MessageBox.error("No se pudo obtener el ID del producto.");
    }
  }

  public async onDeleteMultipleProducts(
    selectedProducts: any[]
  ): Promise<void> {
    const productId = selectedProducts.map((product) => product.idProduct);

    try {
      await Promise.all(
        productId.map(async (productId) => this.oDeleteProduct(productId))
      );
    } catch (error) {
      MessageBox.error(
        `Error al eliminar los productos: ${JSON.stringify(error)}`
      );
    }
  }

  public onDeleteSelectedProducts(): void {
    const oTable = this.getView()?.byId("productsTable") as Table;
    const aSelectedIndices = oTable.getSelectedIndices();
    const aSelectedProducts: any[] = [];

    aSelectedIndices.forEach((index: number) => {
      const oContext = oTable.getContextByIndex(index);
      if (oContext) {
        const oProduct = oContext.getObject();
        aSelectedProducts.push(oProduct);
      }
    });

    if (aSelectedProducts.length === 0) {
      MessageBox.warning("No se han seleccionado productos para eliminar.");
      return;
    }

    const dialog = new Dialog({
      title: "Eliminar Productos",
      type: "Message",
      content: new Text({
        text: `¿Está seguro de que desea eliminar ${aSelectedProducts.length} productos seleccionados?`,
      }),
      beginButton: new Button({
        text: "Aceptar",
        press: () => {
          this.onDeleteMultipleProducts(aSelectedProducts);
          MessageBox.success("Producto eliminado correctamente");
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
    } finally {
      BusyIndicator.hide();
    }
  }

  public editInformation(): void {
    const editButton = this.getView()?.byId("editList") as Button;
    const aceptChangesButton = this.getView()?.byId("aceptChanges") as Button;
    const cancelChangesButton = this.getView()?.byId("cancelChanges") as Button;
    const deleteProducts = this.getView()?.byId("deleteProducts") as Button;
    const deleteColumn = this.getView()?.byId("deleteColumn") as Column;
    const visibilityModel = this.getView()?.getModel(
      "oVisibility"
    ) as JSONModel;

    const originalVisibilityState = visibilityModel.getData();
    const backupVisibilityState = { ...originalVisibilityState };
    visibilityModel.setData(backupVisibilityState);

    const isEditable = visibilityModel.getProperty("/isEditable");
    visibilityModel.setProperty("/isEditable", !isEditable);

    if (editButton.getVisible() === true) {
      editButton.setVisible(false);
      aceptChangesButton.setVisible(true);
      cancelChangesButton.setVisible(true);
      deleteProducts.setVisible(true);
      deleteColumn.setVisible(true);
    } else {
      editButton.setVisible(true);
      aceptChangesButton.setVisible(false);
      cancelChangesButton.setVisible(false);
      deleteProducts.setVisible(false);
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

          if (isNaN(price) || isNaN(quantity)) {
            throw new Error(
              "El precio y la cantidad deben ser números válidos."
            );
          }

          const selectedStorage = product.storage;
          const selectedStorageText =
            this.getTextSelectStorage(selectedStorage);

          const updatedProduct = {
            ...product,
            price: price,
            quantity: quantity,
            storage: selectedStorageText,
          };

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
      const deleteProducts = this.getView()?.byId("deleteProducts") as Button;
      const deleteColumn = this.getView()?.byId("deleteColumn") as Column;

      editButton.setVisible(true);
      aceptChangesButton.setVisible(false);
      deleteProducts.setVisible(false);
      cancelChangesButton.setVisible(false);
      deleteColumn.setVisible(false);
    } catch (error) {
      MessageBox.error(`No se pudieron realizar los cambios: ${error}`);
    }
  }

  public getTextSelectStorage(storageId: string): string {
    const dataSelectStorage = this.getView()?.getModel(
      "dataSelectStorage"
    ) as JSONModel;
    const storageData = dataSelectStorage.getData();

    const selectedStorage = storageData.find(
      (item: any) => item.key === storageId
    );
    return selectedStorage ? selectedStorage.text : "";
  }

  public cancelChanges() {
    const visibilityModel = this.getView()?.getModel(
      "oVisibility"
    ) as JSONModel;
    const originalVisibilityState = visibilityModel.getData();

    originalVisibilityState.isEditable = false;
    visibilityModel.setData(originalVisibilityState);

    const editButton = this.getView()?.byId("editList") as Button;
    const aceptChangesButton = this.getView()?.byId("aceptChanges") as Button;
    const cancelChangesButton = this.getView()?.byId("cancelChanges") as Button;
    const deleteProducts = this.getView()?.byId("deleteProducts") as Button;
    const deleteColumn = this.getView()?.byId("deleteColumn") as Column;

    editButton.setVisible(true);
    aceptChangesButton.setVisible(false);
    cancelChangesButton.setVisible(false);
    deleteProducts.setVisible(false);
    deleteColumn.setVisible(false);
  }

  public showEmailInputDialog() {
    const dialog = new Dialog({
      title: "Agrega el Electronico para enviarte el reporte",
      content: new FlexBox({
        justifyContent: "Center",
        alignItems: "Center",
        width: "100%",
        items: [
          new Label({ text: "Correo Electronico" }),
          new Input("inputEmail", { width: "100%" }),
        ],
        direction: "Column",
      }),
      beginButton: new Button({
        text: "Enviar",
        press: async () => {
          const inputEmail: Input = Core.byId("inputEmail") as Input;
          const email: string = inputEmail.getValue();

          const validationResult = this.ValidateEmail(email);

          if (!validationResult.valid) {
            MessageBox.error(validationResult.message);
            return;
          }

          try {
            const response = this.callAjax({
              type: "GET",
              url: "/inventory",
            });

            const inventoryId = response;

            inventoryId.then((response) => {
              const idInventory = response[0].idInventory;

              this.sendReport(idInventory, email);
            });

            dialog.close();
          } catch (error) {
            MessageBox.error("Error al obtener la información del inventario.");
          }
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

  public async sendReport(inventoryId: string, email: string): Promise<void> {
    try {
      await this.callAjax({
        type: "POST",
        url: "/sharing/share-inventory",
        contentType: "application/json",
        data: JSON.stringify({ inventoryId: inventoryId, email: email }),
      });
      MessageBox.success("El reporte se ha enviado correctamente.");
    } catch (error) {
      MessageBox.error(`Error al enviar el reporte: ${JSON.stringify(error)}`);
    }
  }

  public ValidateEmail(email: string) {
    if (!email) {
      return {
        valid: false,
        message: "Por favor, ingrese su correo electrónico.",
      };
    }

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        valid: false,
        message: "Por favor, ingrese un correo electrónico válido.",
      };
    }

    return {
      valid: true,
      message: "",
    };
  }

  public async handleSearch(oEvent: any): Promise<void> {
    const oSearchField = oEvent.getSource() as SearchField;
    const searchTerm: string = oSearchField.getValue();
    const oTable = this.getView()?.byId("productsTable") as Table;
    const oListStorageModel = this.getView()?.getModel(
      "oListStorage"
    ) as JSONModel;

    try {
      let response;

      if (!isNaN(parseFloat(searchTerm))) {
        response = await this.callAjax({
          url: `/products/price/${searchTerm}`,
          method: "GET",
        });
      } else {
        response = await this.callAjax({
          url: `/products/name/${searchTerm}`,
          method: "GET",
        });
      }

      if (response.length === 0) {
        MessageBox.information(
          "No se encontraron resultados para la búsqueda."
        );
        return;
      }

      const oNewModel = new JSONModel(response);
      this.getView()?.setModel(oNewModel, "oNewModel");

      oTable.setModel(oNewModel);
      oTable.bindRows({
        path: "/",
      });
    } catch (error) {
      oSearchField.setValue("");
      MessageBox.error(`Error al buscar productos: ${error}`);
      oTable.setModel(oListStorageModel);
    }
  }

  public onStorageChange(): any {
    let oListStorageModel = this.getView()?.getModel(
      "oListStorage"
    ) as JSONModel;
    let defaultStorageId = oListStorageModel.getProperty("/storage");

    let oSelect = this.getView()?.byId("storage") as Select; // Reemplaza "idDelSelect" con el ID de tu Select
    if (oSelect) {
      oSelect.setSelectedKey(defaultStorageId);
    }
  }
}

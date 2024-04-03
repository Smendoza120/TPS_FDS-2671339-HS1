import SimpleForm from "sap/ui/layout/form/SimpleForm";
import Base from "../Base.controller";
import Label from "sap/m/Label";
import Input from "sap/m/Input";
import Dialog from "sap/m/Dialog";
import Button from "sap/m/Button";
import MessageBox from "sap/m/MessageBox";
import JSONModel from "sap/ui/model/json/JSONModel";
import Column from "sap/ui/table/Column";
import Table from "sap/ui/table/Table";
import Text from "sap/m/Text";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class DailySales extends Base {
  private customerId: string | null = null;

  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    this.getView()?.setModel(new JSONModel([]), "dailySales");
    this.getView()?.setModel(new JSONModel([]), "oVisibility");

    this.getProductsOnTemporalTable();
    this.setDataVisibleAndEditableModel();
  }

  onAfterRendering(): void {
    this.getProductsOnTemporalTable();
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

  public async sendBullToCustomerDialog(): Promise<void> {
    try {
      const customerId = await this.getLatestCustomerId();

      if (!customerId) {
        throw new Error("No se pudo obtener el ID del cliente más reciente.");
      }

      const salesIds = await this.getAllSalesIds();

      if (salesIds.length === 0) {
        throw new Error("No se encontraron ventas en la tabla temp-sales.");
      }

      const currentDate = new Date().toISOString().slice(0, 10);

      await this.sendBillToCustomer(customerId, salesIds, currentDate);
    } catch (error) {
      MessageBox.error(`Error al enviar la factura: ${JSON.stringify(error)}`);
    }
  }

  public createCustomerDialog() {
    const oForm = new SimpleForm({
      content: [
        new Label({ text: "Nombre" }),
        new Input({ placeholder: "Carlos" }),

        new Label({ text: "Apellido" }),
        new Input({ placeholder: "Sanchez" }),

        new Label({ text: "Correo" }),
        new Input({ placeholder: "correo@gmail.com" }),

        new Label({ text: "Telefono" }),
        new Input({ placeholder: "3118047052" }),
      ],
    });

    const oDialog = new Dialog({
      title: "Create customer",
      content: oForm,
      beginButton: new Button({
        text: "Crear",
        press: () => {
          const firstName = (oForm.getContent()[1] as Input).getValue();
          const lastName = (oForm.getContent()[3] as Input).getValue();
          const email = (oForm.getContent()[5] as Input).getValue();
          const phone = (oForm.getContent()[7] as Input).getValue();

          const userData = this.createUser(firstName, lastName, email, phone);

          // if (userData) {
          //   this.customerId = userData;
          // }
          oDialog.close();
        },
      }),
      endButton: new Button({
        text: "Cancelar",
        press: () => {
          if (oDialog) {
            oDialog.close();
          }
        },
      }),
    });

    oDialog.open();
  }

  public async createUser(
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ): Promise<string | null> {
    try {
      if (!firstName || !lastName || !email || !phone) {
        throw new Error("Por favor, complete todos los campos.");
      }

      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      };

      const createdUser = await this.callAjax({
        url: "/users",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(newUser),
      });

      if (createdUser) {
        MessageBox.success("Cliente creado exitosamente.");

        await this.createCustomer(createdUser.idUser);

        return createdUser.idUser;
      } else {
        throw new Error("Error al crear el usuario.");
      }
    } catch (error) {
      MessageBox.error(
        "Error al crear el cliente. Por favor, inténtelo de nuevo."
      );
      alert(error);
      throw error;
    }
  }

  private async createCustomer(userId: string): Promise<void> {
    try {
      await this.callAjax({
        type: "POST",
        url: "/customers",
        contentType: "application/json",
        data: JSON.stringify({ userId }),
      });
    } catch (error) {
      throw new Error("Error al crear el cliente.");
    }
  }

  public async getLatestCustomerId(): Promise<string | undefined> {
    try {
      const customersResponse = await this.callAjax({
        url: "/customers",
        method: "GET",
      });

      if (customersResponse && customersResponse.length > 0) {
        const latestCustomer = customersResponse.reverse()[0];
        const latestCustomerId = latestCustomer.idCustomer;

        return latestCustomerId;
      } else {
        throw new Error("No se encontraron clientes.");
      }
    } catch (error) {
      throw new Error(`Error al obtener el último cliente: ${error}`);
    }
  }

  public async getAllSalesIds(): Promise<string[]> {
    try {
      const tempSalesReponse = await this.callAjax({
        url: "/temp-sales",
        method: "GET",
      });

      if (tempSalesReponse && tempSalesReponse.length > 0) {
        const salesIds = tempSalesReponse.map((sale: any) => sale.idSales);
        return salesIds;
      } else {
        throw new Error("No se encontraron ventas en la tabla temp-sales.");
      }
    } catch (error) {
      throw new Error(`Error al obtener los idSales: ${error}`);
    }
  }

  private async confirmTempSales(): Promise<void> {
    try {
      await this.callAjax({
        method: "POST",
        url: "/temp-sales/confirm",
        contentType: "application/json",
      });
    } catch (error) {
      throw new Error(`Error al confirmar las ventas temporales: ${error}`);
    }
  }

  public async sendBillToCustomer(
    customerId: string,
    salesIds: string[],
    date: string
  ): Promise<void> {
    try {
      const billData = {
        customerId: customerId,
        salesIds: salesIds,
        date: date,
      };

      const response = await this.callAjax({
        url: "/bills",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(billData),
      });

      if (response) {
        await this.confirmTempSales();

        MessageBox.success("Factura enviada exitosamente.");
      } else {
        throw new Error("Error al enviar la factura.");
      }
    } catch (error) {
      MessageBox.error(`Error al enviar la factura: ${JSON.stringify(error)}`);
    }
  }

  private clearFields() {
    (this.getView()?.byId("productId") as Input).setValue("");

    (this.getView()?.byId("quantityId") as Input).setValue("");
  }

  public async onConfirmSaleCLick() {
    try {
      const productName = (
        this.getView()?.byId("productId") as Input
      ).getValue();
      const quantity = parseInt(
        (this.getView()?.byId("quantityId") as Input).getValue()
      );

      if (!productName || !quantity || quantity <= 0) {
        MessageBox.error("Por favor, complete todos los campos correctamente.");
        return;
      }

      const today = new Date().toISOString().slice(0, 10);

      const productInfo = await this.checkProductExist(productName, quantity);
      const idProduct = productInfo.idProduct;

      await this.addProductToTempSales(idProduct, quantity, today);

      this.getProductsOnTemporalTable();

      this.clearFields();
    } catch (error) {
      MessageBox.error(`Error al crear la venta: ${error}`);
    }
  }

  private async addProductToTempSales(
    productId: string,
    quantity: number,
    salesDate: string
  ): Promise<void> {
    try {
      await this.callAjax({
        url: "/temp-sales",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ productId, quantity, salesDate }),
      });
    } catch (error) {
      throw new Error("Error al agregar el producto a la venta.");
    }
  }

  private async checkProductExist(
    productName: string,
    quantity: number
  ): Promise<{ idProduct: string; quantity: number }> {
    try {
      const productResponse = await this.callAjax({
        url: `/products/name/${productName}`,
        type: "GET",
      });

      if (!productResponse) {
        throw new Error("El producto no está disponible en el inventario.");
      }

      const availableQuantity = productResponse.quantity;
      if (availableQuantity < quantity) {
        MessageBox.error(
          "No hay suficiente cantidad disponible del producto en el inventario."
        );
      } else {
        MessageBox.success("Producto agregado a la venta exitosamente.");
      }

      return productResponse;
    } catch (error) {
      throw new Error(
        "Error al verificar la existencia del producto en el inventario."
      );
    }
  }

  public async getProductsOnTemporalTable() {
    try {
      const response = await this.callAjax({
        url: "/temp-sales",
        method: "GET",
      });

      const dailySalesModel = this.getView()?.getModel(
        "dailySales"
      ) as JSONModel;

      dailySalesModel.setData(response);
    } catch (error) {
      throw new Error("Error al agregar el producto al modelo");
    }
  }

  public async onDeleteProductFromRow(oEvent: any): Promise<void> {
    const productId = oEvent
      .getSource()
      .getBindingContext("dailySales")
      .getObject();

    if (productId) {
      try {
        this.deleteProductFromSale(productId.idSales);
      } catch (error) {
        MessageBox.error("No se pudo obtener el ID del producto.");
      }
    }
  }

  private async deleteProductFromSale(productId: string): Promise<void> {
    try {
      await this.callAjax({
        url: `/temp-sales/${productId}`,
        method: "DELETE",
      });

      MessageBox.success("Producto eliminado exitosamente de la venta.");
      this.getProductsOnTemporalTable();
    } catch (error) {
      throw new Error(`Error al eliminar el producto de la venta: ${error}`);
    }
  }

  public editInformation(): void {
    const editList = this.getView()?.byId("editList") as Button;
    const aceptChanges = this.getView()?.byId("aceptChanges") as Button;
    const cancelChanges = this.getView()?.byId("cancelChanges") as Button;
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

    if (editList.getVisible()) {
      editList.setVisible(false);
      aceptChanges.setVisible(true);
      cancelChanges.setVisible(true);
      deleteProducts.setVisible(true);
      deleteColumn.setVisible(true);
    } else {
      editList.setVisible(true);
      aceptChanges.setVisible(false);
      cancelChanges.setVisible(false);
      deleteProducts.setVisible(false);
      deleteColumn.setVisible(false);
    }
  }

  public cancelChanges() {
    const visibilityModel = this.getView()?.getModel(
      "oVisibility"
    ) as JSONModel;
    const originalVisibilityState = visibilityModel.getData();

    originalVisibilityState.isEditable = false;
    visibilityModel.setData(originalVisibilityState);

    const editList = this.getView()?.byId("editList") as Button;
    const aceptChanges = this.getView()?.byId("aceptChanges") as Button;
    const cancelChanges = this.getView()?.byId("cancelChanges") as Button;
    const deleteProducts = this.getView()?.byId("deleteProducts") as Button;
    const deleteColumn = this.getView()?.byId("deleteColumn") as Column;

    editList.setVisible(true);
    aceptChanges.setVisible(false);
    cancelChanges.setVisible(false);
    deleteProducts.setVisible(false);
    deleteColumn.setVisible(false);
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
        press: async () => {
          try {
            await this.deleteMultipleProducts(aSelectedProducts);
            dialog.close();
          } catch (error) {
            MessageBox.error(
              `Error al eliminar los productos: ${JSON.stringify(error)}`
            );
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

  private async deleteMultipleProducts(products: any[]): Promise<void> {
    try {
      const deletePromises = products.map(async (product) => {
        await this.deleteProductFromSale(product.idSales);
      });

      await Promise.all(deletePromises);
      this.getProductsOnTemporalTable();
    } catch (error) {
      throw new Error(`Error al eliminar los productos: ${error}`);
    }
  }

  //!Pendiente
  public async aceptChanges() {
    try {
      const dailySalesModel = this.getView()?.getModel(
        "dailySales"
      ) as JSONModel;
      const updatedData = dailySalesModel.getData();

      const currentDate = new Date().toISOString().slice(0, 10);

      await Promise.all(
        updatedData.map(async (sale: any) => {
          // alert(JSON.stringify(sale, null, 2));
          const salesId = sale.idSales;
          const quantity = sale.quantity;

          if (salesId && quantity !== undefined) {
            await this.updateProduct(salesId, quantity, currentDate);
          } else {
            MessageBox.error(
              `La cantidad ingresada para la venta ${salesId} no es válida.`
            );
          }
        })
      );

      MessageBox.success("Datos del producto actualizados exitosamente.");
    } catch (error) {
      MessageBox.error(`No se pudieron realizar los cambios: ${error}`);
    }
  }

  private async updateProduct(
    productId: string,
    quantity: number,
    salesDate: string
  ): Promise<void> {
    try {
      const updatedData = {
        quantity: quantity,
        salesDate: salesDate,
      };

      // alert(JSON.stringify(updatedData, null, 2));

      await this.callAjax({
        url: `/temp-sales/${productId}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedData),
      });

      this.getProductsOnTemporalTable();
    } catch (error) {
      throw new Error(
        `Error al actualizar los datos del producto: ${JSON.stringify(error)}`
      );
    }
  }
}

import SimpleForm from "sap/ui/layout/form/SimpleForm";
import Base from "../Base.controller";
import Label from "sap/m/Label";
import Input from "sap/m/Input";
import Dialog from "sap/m/Dialog";
import Button from "sap/m/Button";
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class DailySales extends Base {
  private customerId: string | null = null;

  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {}

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

          const customerId = this.createCustomer(
            firstName,
            lastName,
            email,
            phone
          );

          if (customerId) {
            this.customerId = customerId;
            oDialog.close();
          }
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

  public async createCustomer(
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
        return createdUser.idUser;
      } else {
        throw new Error("Error al crear el usuario.");
      }
    } catch (error) {
      MessageBox.error(
        "Error al crear el cliente. Por favor, inténtelo de nuevo."
      );
      console.error("Error al crear el cliente:", error);
      throw error;
    }
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

      if (!this.customerId) {
        MessageBox.error("Primero debe crear un cliente.");
        return;
      }

      await this.createSale(this.customerId, productName, quantity);
    } catch (error) {
      MessageBox.error(`Error al crear la venta: ${error}`);
    }
  }

  public async createSale(
    customerId: string,
    productName: string,
    quantity: number
  ) {
    try {
      const sale = await this.createSaleForCustomer(customerId);

      const product = await this.checkProductExist(productName, quantity);

      await this.addProductToSale(sale.id, product.id, quantity);

      MessageBox.success("Producto agregado a la venta exitosamente.");
    } catch (error) {
      MessageBox.error(`Error al crear la venta: ${error}`);
      throw error;
    }
  }

  private async createSaleForCustomer(customerId: string): Promise<void> {
    try {
      const resposne = await this.callAjax({
        url: "/sales",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ customerId }),
      });

      return resposne.sale;
    } catch (error) {
      throw new Error("Error al crear la venta para el cliente.");
    }
  }

  private async checkProductExist(
    productName: string,
    quantity: number
  ): Promise<void> {
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
        throw new Error(
          "No hay suficiente cantidad disponible del producto en el inventario."
        );
      }

      return productResponse;
    } catch (error) {
      throw new Error(
        "Error al verificar la existencia del producto en el inventario."
      );
    }
  }

  private async addProductToSale(
    saleId: string,
    productId: string,
    quantity: number
  ): Promise<void> {
    try {
      await this.callAjax({
        url: `/sales/${saleId}/products`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ productId, quantity }),
      });
    } catch (error) {
      throw new Error("Error al agregar el producto a la venta.");
    }
  }
}

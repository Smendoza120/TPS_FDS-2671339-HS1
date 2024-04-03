import MessageBox from "sap/m/MessageBox";
import JSONModel from "sap/ui/model/json/JSONModel";
import Base from "../Base.controller";
import Label from "sap/m/Label";
import Input from "sap/m/Input";
import Dialog from "sap/m/Dialog";
import Button from "sap/m/Button";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class ListSales extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    this.getView()?.setModel(new JSONModel([]), "salesData");

    this.fetchSalesData();
  }

  onAfterRendering(): void {
    this.fetchSalesData();
  }

  public async fetchSalesData(): Promise<void> {
    try {
      const salesData = await this.callSalesEndPoint();
      const salesModel = this.getView()?.getModel("salesData") as JSONModel;
      salesModel.setData(salesData);
    } catch (error) {
      MessageBox.error(`Error al obtener los datos de ventas: ${error}`);
    }
  }

  private async callSalesEndPoint(): Promise<any[]> {
    const response = await this.callAjax({
      url: "/sales",
      type: "GET",
    });

    return response;
  }

  public async handleReportButtonClick() {
    try {
      const email = await this.showEmailInputdialog();

      const currentDate = new Date().toISOString().slice(0, 10);

      const reportId = await this.getReportId(currentDate);

      // alert(reportId);
      // alert(JSON.stringify(reportId));

      await this.shareSalesReport(reportId, email);
      MessageBox.success(
        "Reporte enviado exitosamente por correo electrónico."
      );
    } catch (error) {
      MessageBox.error(`Error al enviar el reporte: ${error}`);
    }
  }

  private async showEmailInputdialog(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const emailInputDialog = new Dialog({
        title: "Ingrese su correo electrónico",
        content: [
          new Label({ text: "Correo electrónico:" }),
          new Input({ placeholder: "correo@example.com" }),
        ],
        beginButton: new Button({
          text: "Enviar",
          press: () => {
            const email = (
              emailInputDialog.getContent()[1] as Input
            ).getValue();

            if (email) {
              emailInputDialog.close();
              resolve(email);
            } else {
              reject(new Error("Debe ingresar un correo electrónico válido."));
            }
          },
        }),
        endButton: new Button({
          text: "Cancelar",
          press: () => {
            emailInputDialog.close();
          },
        }),
      });

      emailInputDialog.open();
    });
  }

  private async getReportId(date: string): Promise<string> {
    try {
      const response = await this.callAjax({
        url: `/reports`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ date }),
      });

      // alert(response);
      // alert(JSON.stringify(response));

      return response.idReportSales;
    } catch (error) {
      throw new Error(`Error al obtener el id del reporte: ${error}`);
    }
  }

  private async shareSalesReport(
    reportId: string,
    email: string
  ): Promise<void> {
    try {
      await this.callAjax({
        url: "/sharing/share-sales-report",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ reportId, email }),
      });
    } catch (error) {
      throw new Error(`Error al compartir el reporte: ${error}`);
    }
  }
}

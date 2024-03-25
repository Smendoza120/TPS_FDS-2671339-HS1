import MessageBox from "sap/m/MessageBox";
import JSONModel from "sap/ui/model/json/JSONModel";
import Base from "../Base.controller";

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
}

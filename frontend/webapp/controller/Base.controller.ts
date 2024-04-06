import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import { CurrentUserInterface } from "../interfaces/current-user.interface";
import BusyIndicator from "sap/ui/core/BusyIndicator";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class Base extends Controller {
  public getRouter() {
    return (this.getOwnerComponent() as UIComponent).getRouter();
  }

  public getBackendUrl(): string {
    return window.location.host.includes("market_system.co")
      ? window.location.origin
       : "https://nest-backend-market-system-postgres.onrender.com";
        // "http://localhost:3000";
  }

  public callAjax(settings: JQuery.AjaxSettings<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      const sToken = localStorage.getItem("token");
      let authHeaders: any = {};

      if (sToken) {
        authHeaders.Authorization = "Bearer " + sToken;
      }

      $.ajax({
        ...settings,
        url: this.getBackendUrl() + settings.url,
        cache: false,
        async: true,
        headers: {
          Accept: "application/json",
          ...authHeaders,
        },
        success: (oResponse: CurrentUserInterface): void => {
          resolve(oResponse);
        },
        error: (oError: any): void => {
          reject(oError);
        },
      });
    });
  }
}

import BusyIndicator from "sap/ui/core/BusyIndicator";
import Base from "../Base.controller";
import Input from "sap/m/Input";
import MessageToast from "sap/m/MessageToast";
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class SendMail extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {}

  public validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public onLonIn(): void{
    this.getRouter().navTo("RouteLogIn");
  }

  public async oSendMail(): Promise<any> {
    const emailInput = this.getView()?.byId("sendMail") as Input;
    const userEmail = emailInput.getValue();

    try {
      BusyIndicator.show(0);

      const response = await this.callAjax({
        url: "/auth/reset-password",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ email: userEmail }),
      });

      if (response) {
        if (!this.validateEmail(userEmail)) {
          emailInput.setValueState("Error");
          emailInput.setValueStateText(
            "Formato de correo electrónico incorrecto"
          );
          emailInput.rerender();

          MessageBox.show(
            "Error al enviar el correo electrónico. Por favor, inténtelo de nuevo."
          );
        } else {
          MessageBox.show("Correo electrónico enviado correctamente");
        }
      } 
    } catch (error) {
      console.error(error);
      MessageToast.show(
        "Error al enviar el correo electrónico. Por favor, inténtelo de nuevo."
      );
    } finally {
      BusyIndicator.hide();
    }
  }
}

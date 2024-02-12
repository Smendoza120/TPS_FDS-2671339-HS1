<<<<<<< HEAD
import BusyIndicator from "sap/ui/core/BusyIndicator";
import Base from "../Base.controller";
import Input from "sap/m/Input";
import MessageToast from "sap/m/MessageToast";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class SendMail extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {}

  public async oSendMail(): Promise<any> {
    const userEmail = (this.getView()?.byId("sendMail") as Input).getValue();

    try {
      BusyIndicator.show(0);

      const response = await this.callAjax({
        url: "/auth/reset-password",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ email: userEmail }),
      });

      if (response) {
        MessageToast.show("Correo electrónico enviado correctamente");
      } else {
        MessageToast.show(
          "Error al enviar el correo electrónico. Por favor, inténtelo de nuevo más tarde."
        );
      }
    } catch (error) {
      console.error(error);
      MessageToast.show(
        "Error al enviar el correo electrónico. Por favor, inténtelo de nuevo más tarde."
      );
    } finally {
      BusyIndicator.hide();
    }
  }
}
=======
import Base from "../Base.controller";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class SendMail extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {}
}
>>>>>>> upstream/dev-hs

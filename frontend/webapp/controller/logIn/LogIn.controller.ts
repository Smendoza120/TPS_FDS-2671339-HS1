import Input from "sap/m/Input";
import Base from "../Base.controller";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import MessageBox from "sap/m/MessageBox";
import { ValueState } from "sap/ui/core/library";
import Text from "sap/m/Text";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class LogIn extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {}

  public goToHomePage(): void {
    this.getRouter().navTo("RouteHome");
  }

  public async onLogIn(): Promise<void> {
    const mailInput = this.getView()?.byId("mail") as Input;
    const passInput = this.getView()?.byId("pass") as Input;

    const errorText: Text = this.getView()?.byId("errorMail") as Text;

    const userMail = mailInput.getValue();
    const userPass = passInput.getValue();

    mailInput.setValueState(ValueState.None);

    if (!this.validateEmail(userMail)) {
      errorText.setVisible(true);
      mailInput.setValueState(ValueState.Error);
      return;
    }

    try {
      mailInput.setValueState(ValueState.None);
      errorText.setVisible(false);

      const response = await this.authenticateUser(userMail, userPass);

      if (response) {
        this.goToHomePage();
      }
    } catch (error) {
      console.error("Error", error);
      alert(JSON.stringify(error));
    }
  }

  private validateEmail(email: string): boolean {
    const emailRejex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRejex.test(email);
  }

  public async authenticateUser(email: string, password: string): Promise<any> {
    BusyIndicator.show(0);

    return this.callAjax({
      type: "POST",
      url: "/auth/login",
      contentType: "application/json",
      data: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response) {
          return response;
        } else {
          throw new Error(
            "Credenciales incorrectas. Por favor, inténtelo de nuevo."
          );
        }
      })
      .catch((err) => {
        if (err.status === 404 && err.statusText === "Not Found") {
          MessageBox.error(
            "Credenciales incorrectas. Por favor, inténtelo de nuevo."
          );
          this.onCleanForm();
          throw new Error("Usuario no encontrado");
        } else {
          throw new Error("Error en la autenticacion");
        }
      })
      .finally(() => {
        BusyIndicator.hide();
      });
  }

  public onCleanForm(): void {
    const mailInput = this.getView()?.byId("mail") as Input;
    const passInput = this.getView()?.byId("pass") as Input;

    const errorText: Text = this.getView()?.byId("errorMail") as Text;

    mailInput.setValue("");
    mailInput.setValueState(ValueState.None);
    passInput.setValue("");
    errorText.setVisible(false);
  }

  public onSendMail() {
    this.getRouter().navTo("RouteSendMail");
  }
}

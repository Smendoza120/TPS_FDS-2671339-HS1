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
  public onInit(): void {
    const sessionId = localStorage.getItem("sessionId");
    // alert(`SessionID: ${sessionId}`);
  }

  public goToHomePage(): void {
    this.getRouter().navTo("RouteHome");
  }

  private async extractAndStoreAccessTokenFromCookie(): Promise<void> {
    const cookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)j\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    const cookieData = JSON.parse(decodeURIComponent(cookieValue));

    const accessToken = cookieData;

    if (accessToken) {
      // localStorage.setItem("accessToken", accessToken);
      // alert(`accessToken: ${accessToken}`);
    } else {
      // alert("No se pudo encontrar el token");
    }
  }

  public async onLogIn(): Promise<void> {
    const mailInput = this.getView()?.byId("mail") as Input;
    const passInput = this.getView()?.byId("pass") as Input;

    const errorText: Text = this.getView()?.byId("errorMail") as Text;
    const formError: Text = this.getView()?.byId("formError") as Text;

    const userMail = mailInput.getValue();
    const userPass = passInput.getValue();

    mailInput.setValueState(ValueState.None);

    if (userMail === "" && userPass === "") {
      passInput.setValueState(ValueState.Error);
      mailInput.setValueState(ValueState.Error);
      formError.setText("Ingresa los datos");
      formError.setVisible(true);
      return;
    }

    if (userMail === "") {
      errorText.setVisible(true);
      errorText.setText("Ingresa un correo electronico");
      mailInput.setValueState(ValueState.Error);
      return;
    } else if (!this.validateEmail(userMail)) {
      errorText.setVisible(true);
      errorText.setText("Correo electrónico no válido");
      mailInput.setValueState(ValueState.Error);
      return;
    }

    if (userPass === "") {
      passInput.setValueState(ValueState.Error);
      formError.setText("Ingresa la contraseña");
      formError.setVisible(true);
      return;
    }

    try {
      passInput.setValueState(ValueState.None);
      formError.setVisible(false);
      mailInput.setValueState(ValueState.None);
      errorText.setVisible(false);

      const response = await this.authenticateUser(userMail, userPass);

      if (response) {
        this.goToHomePage();
        await this.extractAndStoreAccessTokenFromCookie();
      } else {
        alert("Aqui");
        MessageBox.error(
          "Credenciales incorrectas. Por favor, inténtelo de nuevo."
        );
      }
    } catch (error) {
      console.error("Error", error);
      // alert(JSON.stringify(error));
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
          const sessionId = response.status;
          const prueba = localStorage.getItem("accessToken");
          document.cookie = ``;
          
          return response;
        } else {
          MessageBox.error(
            "Credenciales incorrectas. Por favor, inténtelo de nuevo."
          );

          this.onCleanForm();

          throw new Error("Credenciales incorrectas");
        }
      })
      .catch((err) => {
        MessageBox.error(
          "Error al autenticar usuario. Por favor, inténtelo de nuevo."
        );
        throw err;
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

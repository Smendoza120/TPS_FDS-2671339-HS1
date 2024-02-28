import Input from "sap/m/Input";
import Base from "../Base.controller";
import MessageBox from "sap/m/MessageBox";
import BusyIndicator from "sap/ui/core/BusyIndicator";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class ResetPassword extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {}

  public clearInputs(): void {
    const firstPassInput = this.getView()?.byId("firstPass") as Input;
    const secondPassInput = this.getView()?.byId("secondPass") as Input;

    firstPassInput.setValue("");
    secondPassInput.setValue("");
  }

  public onResetPassword(): void {
    const firstPassInput = this.getView()?.byId("firstPass") as Input;
    const secondPassInput = this.getView()?.byId("secondPass") as Input;

    const newPassword = firstPassInput.getValue();
    const confirmPassword = secondPassInput.getValue();

    if (!newPassword || !confirmPassword) {
      MessageBox.error("Por favor, ingrese una contraseña y confírmela.");
      return;
    }

    if (newPassword.length < 8) {
      MessageBox.error("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      MessageBox.error("Las contraseñas no coinciden");
      this.clearInputs();
      return;
    }

    const token = "Token";
    const requestData = {
      password: newPassword,
      confirmPassword: confirmPassword,
    };

    BusyIndicator.show(0);

    this.callAjax({
      type: "POST",
      url: `/auth/reset-password/${token}`,
      contentType: "application/json",
      data: JSON.stringify(requestData),
    })
      .then(() => {
        MessageBox.success("Contraseña restablecida con éxito");
      })
      .catch((error) => {
        MessageBox.error(
          `Error al restablecer la contraseña: ${JSON.stringify(error)}`
        );
      })
      .finally(() => {
        BusyIndicator.hide();
      });
  }
}

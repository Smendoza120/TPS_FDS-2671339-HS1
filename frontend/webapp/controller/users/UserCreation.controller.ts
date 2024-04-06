import JSONModel from "sap/ui/model/json/JSONModel";
import { getListPosition } from "../../model/models";
import Base from "../Base.controller";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import { Users } from "../../interfaces/users.interfaz";
import { Workers } from "../../interfaces/workers.interfaz";
import MessageBox from "sap/m/MessageBox";
import Input from "sap/m/Input";
import Switch from "sap/m/Switch";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class UserCreation extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    this.getView()?.setModel(getListPosition(), "oListPosition");
    this.getView()?.setModel(new JSONModel([]), "oWorkers");

    this.getView()?.setModel(
      new JSONModel({
        userId: "",
        password: "",
        salesPermission: true,
        inventoryPermission: true,
        usersPermission: true,
        billsPermission: true,
        user: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        },
      } as Workers),
      "formWorker"
    );
  }

  public onUpdateWorker(): void {
    sap.ui
      .getCore()
      .getEventBus()
      .publish("updateTableWorker", "updateTableWorker");
  }

  public createUser() {
    const formData = (
      this.getView()?.getModel("formWorker") as JSONModel
    ).getData();

    if (this.validateFormData(formData)) {
      this.createUserInDatabase(formData.user)
        .then((createUser: any) => {
          if (createUser.idUser) {
            this.onUpdateWorker();
            return this.createWorker(createUser.idUser, formData);
          } else {
            MessageBox.error(
              "Error al crear el usuario. Por favor, inténtelo de nuevo."
            );
          }
        })
        .catch((err: any) => {
          MessageBox.error(
            "Error al crear el usuario. Por favor, inténtelo de nuevo."
          );
        });
    } else {
      MessageBox.error("Por favor, complete todos los campos obligatorios.");
    }
  }

  private createUserInDatabase(userData: Users): Promise<any> {
    return new Promise((resolve, reject) => {
      this.callAjax({
        url: "/users",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
      })
        .then((createdUser: any) => {
          if (createdUser.idUser) {
            const userModel = this.getView()?.getModel(
              "formWorker"
            ) as JSONModel;

            userModel.setProperty("/userId", createdUser.idUser);

            resolve(createdUser);
          } else {
            MessageBox.error(
              "El error esta en la creacion de usuario en la base de datos"
            );
          }

          resolve(createdUser);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public validateFormData(formData: any) {
    return (
      formData.user.firstName.trim() !== "" &&
      formData.user.lastName.trim() !== "" &&
      formData.user.email.trim() !== "" &&
      formData.user.phone.trim() !== ""
    );
  }

  public createWorker(idUser: string, workerData: any) {
    BusyIndicator.show(0);
    workerData.idUser = idUser;

    this.callAjax({
      url: "/workers",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(workerData),
    })
      .then((createWorker: any) => {
        const currentData = (
          this.getView()?.getModel("oWorkers") as JSONModel
        ).getData();

        const updatedData = [...currentData, createWorker];

        (this.getView()?.getModel("oWorkers") as JSONModel).setData(
          updatedData
        );

        MessageBox.success("Trabajador creado exitosamente");
        this.clearFormFields();
        this.updateUserTable();
      })
      .catch((error) => {
        MessageBox.error(
          "Error al crear el trabajador. Por favor, inténtelo de nuevo."
        );
      })
      .finally(() => {
        BusyIndicator.hide();
      });
  }

  public clearFormFields(): void {
    const inputsToClear = ["firstName", "lastName", "pass", "email", "phone"];

    inputsToClear.forEach((fieldName) => {
      const inputField = this.getView()?.byId(fieldName) as Input;
      if (inputField) {
        inputField.setValue("");
      }
    });

    const switchesToClear = [
      "salesPermission",
      "billsPermission",
      "usersPermission",
      "inventoryPermission",
    ];

    switchesToClear.forEach((fieldName) => {
      const switchControl = this.getView()?.byId(fieldName) as Switch;
      if (switchControl) {
        switchControl.setState(true);
      }
    });
  }

  public onCancel(): void {
    this.clearFormFields();
  }

  public goToUsersPage() {
    this.getRouter().navTo("RouteUsers");
  }

  private async updateUserTable() {
    try {
      const workerList = await this.callAjax({
        url: "/workers",
        method: "GET",
      });

      const oWorkerModel = this.getView()?.getModel("oWorkers") as JSONModel;
      oWorkerModel.setData(workerList);
    } catch (error) {
      // alert(JSON.stringify(error));
    }
  }
}

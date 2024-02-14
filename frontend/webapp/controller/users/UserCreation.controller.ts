import JSONModel from "sap/ui/model/json/JSONModel";
import { getListPosition } from "../../model/models";
import Base from "../Base.controller";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import { Users } from "../../interfaces/users.interfaz";
import { Workers } from "../../interfaces/workers.interfaz";
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class UserCreation extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    this.getView()?.setModel(getListPosition(), "oListPosition");

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

  public createUser() {
    const formData = (
      this.getView()?.getModel("formWorker") as JSONModel
    ).getData();

    if (this.validateFormData(formData)) {
      this.createUserInDatabase(formData.user)
        .then((createUser: any) => {
          if (createUser.idUser) {
            alert(`formData: ${JSON.stringify(formData)}`);
            alert(`formData.user: ${JSON.stringify(formData.user)}`);
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
        // alert(`User id antes: ${idUser}`);
        // alert(`Creacion de trabajador: ${createWorker}`);
        // alert(`Datos del trabajador ${JSON.stringify(createWorker)}`);

        const currentData = (
          this.getView()?.getModel("oWorkers") as JSONModel
        ).getData();

        const updatedData = [...currentData, createWorker];

        (this.getView()?.getModel("oWorkers") as JSONModel).setData(
          updatedData
        );

        MessageBox.success("Trabajador creado exitosamente");
        alert(`User id despues: ${idUser}`);
      })
      .catch((error) => {
        alert(`Este es el userid: ${idUser}`);
        alert(JSON.stringify(error));
        MessageBox.error(
          "Error al crear el trabajador. Por favor, inténtelo de nuevo."
        );

        alert("El error esta en la creacion de trabajador"); //Error
      })
      .finally(() => {
        BusyIndicator.hide();
      });
  }

  public goToUsersPage() {
    this.getRouter().navTo("RouteUsers");
  }
}

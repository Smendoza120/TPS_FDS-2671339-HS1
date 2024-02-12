import JSONModel from "sap/ui/model/json/JSONModel";
import { getListPosition } from "../../model/models";
import Base from "../Base.controller";
import MessageToast from "sap/m/MessageToast";
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
    // this.getView()?.setModel(getModelUsers(), "oUserList");
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
      } as Workers), // Asegúrate de castear tu modelo con la interfaz correcta
      "formWorker"
    );

    // structureUserCreate();
    // listPosition();
  }

  public createUser() {
    alert("Entrando a la funcion createUser");

    const formData = (
      this.getView()?.getModel("formWorker") as JSONModel
    ).getData();

    if (this.validateFormData(formData)) {
      alert("Datos del formulario validos");

      this.createUserInDatabase(formData.user)
        .then((createUser: any) => {
          alert(`Usuario creado: ${createUser}`);
          if (createUser.idUser) {
            return this.createWorker(createUser.userId, formData);
          } else {
            MessageBox.error(
              "Error al crear el usuario. Por favor, inténtelo de nuevo."
            );
          }
        })
        .catch((err: any) => {
          alert(`Error: ${err}`);
          MessageBox.error(
            "Error al crear el usuario. Por favor, inténtelo de nuevo."
          );
        });
    } else {
      alert(`Datos del formulario no validos`);
      MessageBox.error("Por favor, complete todos los campos obligatorios.");
    }

    alert(JSON.stringify(formData));
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
          } else {
            // alert("Error al crear el usuario: " + JSON.stringify(createdUser));
            console.log("Error");
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
      })
      .catch((error) => {
        alert(`Este es el userid: ${idUser}`);
        alert(JSON.stringify(error));
        MessageBox.error(
          "Error al crear el usuario. Por favor, inténtelo de nuevo."
        );
      })
      .finally(() => {
        BusyIndicator.hide();
      });
  }

  // public createUser() {
  //   const message = "Cuenta creada con exito";
  //   MessageToast.show(message);
  // }

  public goToUsersPage() {
    this.getRouter().navTo("RouteUsers");
  }
}

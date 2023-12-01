import JSONModel from "sap/ui/model/json/JSONModel";
import {
  getListPosition,
  // getModelUsers,
  // listPosition,
  // structureUserCreate,
} from "../../model/models";
import Base from "../Base.controller";
import MessageToast from "sap/m/MessageToast";
import { Users } from "../../interfaces/users.interfaz";

/**
 * @namespace com.marketsystem.marketsystem.controller
 */
export default class UserCreation extends Base {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    // this.getView()?.setModel(getModelUsers(), "oUserList");
    this.getView()?.setModel(getListPosition(), "oListPosition");

    // structureUserCreate();
    // listPosition();
  }

  public prueba() {
    const prueba = this.getView()?.getModel("oUserList") as JSONModel;

    const userCreateData: Users = {
      name: "Harold",
      pass: "asdwasdw",
      mail: "harold@sanchez.com",
      phone: "3118047047",
      position: [
        {
          id: "1",
          position: "Administrador",
        },
      ],
      dilySales: false,
      billing: false,
      inventory: false,
      userCreate: false,
      isEditable: false,
    };
  }

  public createUser() {
    const message = "Cuenta creada con exito";
    MessageToast.show(message);
  }
}

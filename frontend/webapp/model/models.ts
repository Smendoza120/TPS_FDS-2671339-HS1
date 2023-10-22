import JSONModel from "sap/ui/model/json/JSONModel";
import Device from "sap/ui/Device";
import { Position, Users } from "../interfaces/users.interfaz";

const oUsersModel = new JSONModel([]);
const oListPostion = new JSONModel();
let userStructure: Users[];

export function createDeviceModel() {
  const model = new JSONModel(Device);
  model.setDefaultBindingMode("OneWay");
  return model;
}

export function getModelUsers(): JSONModel {
  return oUsersModel;
}

export function getListPosition(): JSONModel {
  return oListPostion;
}

export function structureUserCreate(): Users {
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

  oUsersModel.setData([userCreateData]);
  return userCreateData;
}

export function setUsersData() {
  userStructure = (oUsersModel as JSONModel).getData();
  userStructure.push(structureUserCreate());
}

export function listPosition(): Position[] {
  const position: Position[] = [
    {
      id: "1",
      position: "Administrador",
    },
    {
      id: "2",
      position: "Contador",
    },
    {
      id: "3",
      position: "Gerente",
    },
    {
      id: "4",
      position: "Almacenista",
    },
  ];

  oListPostion.setData(position);
  return position;
}

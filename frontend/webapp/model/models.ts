import JSONModel from "sap/ui/model/json/JSONModel";
import Device from "sap/ui/Device";
import { Position, Users } from "../interfaces/users.interfaz";
import { Inventory, Storage } from "../interfaces/inventory.interfaz";

const oUsersModel = new JSONModel([]);
const oListPostion = new JSONModel();
const oInventoryControl = new JSONModel([]);
const oListStorage = new JSONModel();

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

export function getInventoryControl(): JSONModel {
  return oInventoryControl;
}

export function getListStorage(): JSONModel {
  return oListStorage;
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

export function structureInventory(): Inventory {
  const addInventory: Inventory = {
    product: "Doritos",
    quantity: 2,
    unitPrice: 500,
    storage: {
      id: "1",
      storage: "Almacen",
    },
    expirationDate: new Date(),
    isEdit: false,
  };

  oInventoryControl.setData([addInventory]);
  return addInventory;
}

export function listStorage(): Storage[] {
  const storage: Storage[] = [
    {
      id: "1",
      storage: "Almacen",
    },
    {
      id: "2",
      storage: "Bodega",
    },
  ];

  oListStorage.setData(storage);
  return storage;
}

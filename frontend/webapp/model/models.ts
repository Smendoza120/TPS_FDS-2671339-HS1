import JSONModel from "sap/ui/model/json/JSONModel";
import Device from "sap/ui/Device";
import { Inventory, Storage } from "../interfaces/inventory.interfaz";

//Datos de usuario
const oUser = new JSONModel([]);
//Datos del trabajador
const oWorker = new JSONModel([]);

const oListPostion = new JSONModel();
const oInventoryControl = new JSONModel([]);
const oListStorage = new JSONModel();

export function createDeviceModel() {
  const model = new JSONModel(Device);
  model.setDefaultBindingMode("OneWay");
  return model;
}

export function getUser(): JSONModel {
  return oUser;
}

export function getWorker(): JSONModel {
  return oWorker;
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

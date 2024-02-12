export interface Inventory {
  product: string;
  quantity: number;
  unitPrice: number;
  storage: Storage;
  expirationDate: Date;
  isEdit: boolean;
}

export interface Storage {
  id: string;
  storage: string;
}

export interface Users {
  name: string;
  pass: string;
  mail: string;
  phone: string;
  position: Position[];
  dilySales: boolean;
  userCreate: boolean;
  inventory: boolean;
  billing: boolean;
  isEditable: boolean;
}

export interface Position {
  id: string;
  position: string;
}

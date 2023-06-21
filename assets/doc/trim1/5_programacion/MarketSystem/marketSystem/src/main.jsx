// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
// import { App } from "./App";

//Paginas
import { PrincipalInterfaz } from "./routes/PrincipalInterfaz";
import { InterfazUsers } from "./routes/IntefazUsers";
import { UserCreation } from "./routes/UserCreation";
import { ProfileEditing } from "./routes/ProfileEditing";
import { UserList } from "./routes/UserList";

import { InventoryControl } from "./routes/InventoryControl";

//Enrutador
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrincipalInterfaz
        pathUser={"/interfaz-users"}
        pathInventory={"/inventory"}
      />
    ),
    errorElement: <h1 style={{ color: "white" }}>Error page</h1>,
  },
  {
    path: "/interfaz-users",
    element: (
      <InterfazUsers
        userCreation={"/interfaz-users/userCreation"}
        userList={"/interfaz-users/userList"}
      />
    ),
  },
  {
    path: "/interfaz-users/userCreation",
    element: <UserCreation userCreation={"/interfaz-users/userCreation"} />,
  },
  {
    path: "/interfaz-users/userList",
    element: <UserList userCreation={"/interfaz-users/userList"} />,
  },
  {
    path: "/interfaz-users/userList",
    element: (
      <UserList
        userCreation={"/interfaz-users/userList"}
        userEdit={"/interfaz-users/userList/edit"}
      />
    ),
  },
  {
    path: "/interfaz-users/userList/edit",
    element: <ProfileEditing />,
  },
  {
    path: "/inventory",
    element: <InventoryControl />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

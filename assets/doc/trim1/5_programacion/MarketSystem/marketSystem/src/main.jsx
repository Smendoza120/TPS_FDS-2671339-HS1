// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
// import { App } from "./App";

//Paginas
//Pagina principal
import { PrincipalInterfaz } from "./routes/PrincipalInterfaz";

//Paginas de usuarios
import { InterfazUsers } from "./routes/IntefazUsers";
import { UserCreation } from './routes/UserCreation';
import { UserList } from "./routes/UserList";
import { ProfileEditing } from "./routes/ProfileEditing";

//Paginas de control de inventario
import { InventoryControl } from "./routes/InventoryControl";
import { InventoryReport } from "./routes/InventoryReport";
import { SendInventoryReport } from "./routes/SendInventoryReport";

//Paginas de facturas
import { InvoiceGeneration } from "./routes/InvoiceGeneration";
import { InvoiceHistory } from "./routes/InvoiceHistory";
import { InvoiceDisplay } from "./routes/InvoiceDisplay";

//Pagina de ventas diarias
import { DailySales } from "./routes/DailySales";
import { SalesReport } from "./routes/SalesReport";
import { SendDailySalesReport } from "./routes/SendDailySalesReport";

//Enrutador
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SendingInvoice } from "./routes/SendingInvoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrincipalInterfaz
        pathUser={"/interfaz-users"}
        pathInventory={"/inventory"}
        pathBill={'/invoice'}
        pathDailySales={'/daily-sales'}
      />
    ),
    errorElement: <h1 style={{ color: "white" }}>Error page</h1>,
  },
  {
    path: "/interfaz-users",
    element: (
      <InterfazUsers
        userCreation={"user-creation"}
        userList={"user-list"}
      />
    )
  },

  //Ruta de usuarios
  {
    path: '/interfaz-users/user-creation',
    element: (<UserCreation />)
  },
  {
    path: '/interfaz-users/user-list',
    element: <UserList userEdit={'edit'} />
  },
  { 
    path: '/interfaz-users/user-list/edit',
    element: <ProfileEditing />
  },

  //Ruta inventarios
  {
    path: "/inventory",
    element: <InventoryControl path={'report'} />,
  },
  {
    path: "/inventory/report",
    element: <InventoryReport path={'send-inventory-report'} />,
  },
  {
    path: "/inventory/report/send-inventory-report",
    element: <SendInventoryReport />,
  },

  //Ruta de facturas
  {
    path: '/invoice',
    element: <InvoiceGeneration history={'history'} display={'display-invoice'} />
  },  
  {
    path: '/invoice/display-invoice',
    element: <InvoiceDisplay />
  }, 
  {
    path: '/invoice/history',
    element: <InvoiceHistory send={'send-invoice'}/>
  }, 
  {
    path: '/invoice/history/send-invoice',
    element: <SendingInvoice />
  },

  //Ruta ventas diarias
  {
    path: '/daily-sales',
    element: <DailySales reportSales={'sales-report'} generateReport={'send-sales-report'} />
  },
  {
    path: '/daily-sales/sales-report',
    element: <SalesReport generateReport={'/daily-sales/send-sales-report'}/>
  },
  {
    path: '/daily-sales/send-sales-report',
    element: <SendDailySalesReport />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
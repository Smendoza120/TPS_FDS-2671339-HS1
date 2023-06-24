//Paginas
//Login
import { Login } from "./pages/login/Login";

//Pagina principal
import { PrincipalInterfaz } from "./pages/home/PrincipalInterfaz";

//Paginas de usuarios
import { InterfazUsers } from "./pages/users/interfazUsers/IntefazUsers";
import { UserCreation } from './pages/users/userCreation/UserCreation';
import { UserList } from "./pages/users/userList/UserList";
import { ProfileEditing } from "./pages/users/profileEditing/ProfileEditing";

//Paginas de control de inventario
import { InventoryControl } from "./pages/inventory/inventoryControl/InventoryControl";
import { InventoryReport } from "./pages/inventory/inventoryReport/InventoryReport";
import { SendInventoryReport } from "./pages/inventory/sendInventoryReport/SendInventoryReport";

//Paginas de facturas
import { InvoiceGeneration } from "./pages/invoice/invoiceGeneration/InvoiceGeneration";
import { InvoiceHistory } from "./pages/invoice/invoiceHistory/InvoiceHistory";
import { InvoiceDisplay } from "./pages/invoice/invoiceDisplay/InvoiceDisplay";

//Pagina de ventas diarias
import { DailySales } from "./pages/daily-sales/dailySales/DailySales";
import { SalesReport } from "./pages/daily-sales/salesReport/SalesReport";
import { SendDailySalesReport } from "./pages/daily-sales/sendDailySalesReport/SendDailySalesReport";

//Enrutador
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SendingInvoice } from "./pages/invoice/sendingInvoice/SendingInvoice";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
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
  //Ruta de usuarios
  {
    path: "/interfaz-users",
    element: (
      <InterfazUsers
        userCreation={"user-creation"}
        userList={"user-list"}
      />
    )
  },
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
    element: <InvoiceDisplay sendInvoice={'/invoice/history/send-invoice'}/>
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
    element: <DailySales reportSales={'sales-report'} />
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

export function App() {
  return (
    <RouterProvider router={router} />
  );
}

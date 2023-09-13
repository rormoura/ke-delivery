import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import Login from "./app/home/pages/Login";
import Home from "./app/home/pages/Home";
import Footer from "./app/home/pages/Footer";
import LoginCustomer from "./app/home/pages/LoginCustomer";
import PaymentMethods from "./app/home/pages/PaymentMethods";
import Menu from "./app/home/pages/Menu";
import Pedidos from "./app/home/pages/NovoPedido";
import addItemMenu from "./app/home/pages/Menu/newItem";
import Deliverymans from "./app/home/pages/Deliverymans";
import addDeliveryman from "./app/home/pages/Deliverymans/newDeliv";

const router = createBrowserRouter([
  // {
  //   path: "*",
  //   Component: CreateTest,
  // },
  // {
  //   path: "/create-test",
  //   Component: CreateTest,
  // },
  {
    path: "/tests",
    Component: ListTests,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/footer",
    Component: Footer,
  },
  {
    path: "/login-customer",
    Component: LoginCustomer,
  },
  {
    path: "/paymentMethods",
    Component: PaymentMethods,
  },
  {
    path: "/menu",
    Component: Menu,
  },
  {
    path: "/NovoPedido",
    Component: Pedidos,
  },
  {
    path: "/novoItem",
    Component: addItemMenu,
  },
  {
    path: "/entregadores",
    Component: Deliverymans,
  },
  {
    path: "/novoEntregador",
    Component: addDeliveryman,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

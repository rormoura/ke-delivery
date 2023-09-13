import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginRestaurant from "./app/home/pages/LoginRestaurant";
import Home from "./app/home/pages/Home";
import Footer from "./app/home/pages/Footer";
import LoginCustomer from "./app/home/pages/LoginCustomer";
import PaymentMethods from "./app/home/pages/PaymentMethods";
import Menu from "./app/home/pages/Menu";
import Pedidos from "./app/home/pages/NovoPedido";
import addItemMenu from "./app/home/pages/Menu/newItem";
import Deliverymans from "./app/home/pages/Deliverymans";
import addDeliveryman from "./app/home/pages/Deliverymans/newDeliv";
import Navbar from "./app/home/pages/Navbar";
import RegisterRestaurant from "./app/home/pages/RegisterRestaurant";
import HomeRestaurant from "./app/home/pages/HomeRestaurant";
import TypesRegisters from "./app/home/pages/TypesRegisters";
import TypesLogin from "./app/home/pages/TypesLogin";
import MenuRestaurant from "./app/home/pages/MenuRestaurant";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
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
  {
    path: "/loginRestaurant",
    Component: LoginRestaurant,
  },
  {
    path: "/navbar",
    Component: Navbar,
  },
  {
    path: "/registerRestaurant",
    Component: RegisterRestaurant,
  },
  {
    path: "/homeRestaurant",
    Component: HomeRestaurant,
  },
  {
    path: "/typesRegisters",
    Component: TypesRegisters,
  },
  {
    path: "/typesLogin",
    Component: TypesLogin,
  },
  {
    path: "/menuRestaurant",
    Component: MenuRestaurant,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

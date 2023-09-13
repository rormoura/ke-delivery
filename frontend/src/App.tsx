import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginRestaurant from "./app/home/pages/LoginRestaurant";
import Home from "./app/home/pages/Home";
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
    path: "/homeRestaurant/:id",
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
    path: "/menuRestaurant/:id",
    Component: MenuRestaurant,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

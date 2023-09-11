import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import Login from "./app/home/pages/Login";
import Home from "./app/home/pages/Home";
import Navbar from "./app/home/pages/Navbar";
import RegisterRestaurant from "./app/home/pages/RegisterRestaurant";
import HomeRestaurant from "./app/home/pages/HomeRestaurant";

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
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

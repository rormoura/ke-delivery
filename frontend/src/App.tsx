import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import Login from "./app/home/pages/Login";
import Home from "./app/home/pages/Home";

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
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

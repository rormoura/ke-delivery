import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import Footer from "./app/home/pages/Footer";
import LoginCustomer from "./app/home/pages/LoginCustomer";
import CadastroCustomer from "./app/home/pages/CadastroCustomer";
import PainelCustomer from "./app/home/pages/PainelCustomer";

const router = createBrowserRouter([
  {
    path: "*",
    Component: CreateTest,
  },
  {
    path: "/create-test",
    Component: CreateTest,
  },
  {
    path: "/tests",
    Component: ListTests,
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
    path: "/cadastro-customer",
    Component: CadastroCustomer,
  },
  {
    path: "/painel-customer",
    Component: PainelCustomer,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import DeliverymanCreate from "./app/home/pages/DeliverymanCreate";
import DeliverymanDetails from "./app/home/pages/DeliverymanDetails";
import DeliverymanUpdate from "./app/home/pages/DeliverymanUpdate";
import DeliverymanHome from "./app/home/pages/DeliverymanHome";


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
    path: "/deliveryman",
    Component: DeliverymanHome,
  },
  {
    path: "/deliveryman-create",
    Component: DeliverymanCreate,
  },
  {
    path: "/deliveryman-details/:id",
    Component: DeliverymanDetails,
  },
  {
    path: "/deliveryman-edit/:id",
    Component: DeliverymanUpdate,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

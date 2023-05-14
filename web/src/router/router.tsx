import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login, Register, TaskList } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskList />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />
};

export default Router;

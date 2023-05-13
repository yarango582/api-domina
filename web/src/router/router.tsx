import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Register, TaskDetail, TaskList } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/tasks",
    element: <TaskList />,
  },
  {
    path: "/tasks/:id",
    element: <TaskDetail />,
  }
]);

const Router = () => {
  return <RouterProvider router={router} />
};

export default Router;

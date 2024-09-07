import { createRoot } from "react-dom/client";
import { Login } from "./pages/Login/index.tsx";
import { Register } from "./pages/Register/index.tsx";
import { BookManage } from "./pages/BookManage/index.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <BookManage />,
  },
];
const router = createBrowserRouter(routes);
const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(<RouterProvider router={router} />);

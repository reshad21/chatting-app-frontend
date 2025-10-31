import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../components/NotFoundPage";
import { frontendPaths } from "./frontendPaths.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: frontendPaths,
  },

//   {
//     path: "/admin",
//     element: <DashboardLayout />,
//     children: routeGenerator(adminPaths),
//   },
//   {
//     path: "/user",
//     element: <DashboardLayout />,
//     children: routeGenerator(usersPaths),
//   },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;

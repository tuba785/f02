// Error handling test
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../../../pages/Error/ErrorPage";
const router = createMemoryRouter([
  {
    path: "/",
    element: null,
    errorElement: <ErrorPage />,
    loader: () => {
      throw new Response("Something went terribly wrong.", {
        status: 500,
        statusText: "Internal Server Error",
      });
    },
  },
]);
const AppTest = () => {
  return <RouterProvider router={router} />;
};
export default AppTest;

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import BooksPage from "./pages/Books/BooksPage";
import BookPage from "./pages/Book/BookPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import TermsPage from "./pages/Terms/TermsPage";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import PurchasePage from "./pages/Purchase/PurchasePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import PromosPage from "./pages/Promos/PromosPage";
import NewsPage from "./pages/News/NewsPage";
import ErrorPage from "./pages/Error/ErrorPage";
import ScrollToTop from "./utils/ScrollToTop";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/books",
        element: <BooksPage />,
      },
      {
        path: "/books/:id",
        element: <BookPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/terms",
        element: <TermsPage />,
      },
      {
        path: "/about",
        element: <AboutUsPage />,
      },
      {
        path: "/purchase",
        element: <PurchasePage />,
      },
      {
        path: "/promos",
        element: <PromosPage />,
      },
      {
        path: "/news",
        element: <NewsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

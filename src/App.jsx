import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Notfound from "./Pages/Notfound";
import ProductPage from "./Pages/ProductPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="*" element={<Notfound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

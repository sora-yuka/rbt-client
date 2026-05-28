import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import Deals from "../pages/Deals";
import Home from "../pages/Home";
import Login from "../pages/Auth";
import MyOffers from "../pages/MyOffers";
import NewOffer from "../pages/NewOffer";
import NotFound from "../pages/NotFound";
import OfferDetail from "../pages/OfferDetail";
import Register from "../pages/Register";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/offers/:id" element={<OfferDetail />} />
      <Route
        path="/offers/new"
        element={
          <RequireAuth>
            <NewOffer />
          </RequireAuth>
        }
      />
      <Route
        path="/deals"
        element={
          <RequireAuth>
            <Deals />
          </RequireAuth>
        }
      />
      <Route
        path="/my-offers"
        element={
          <RequireAuth>
            <MyOffers />
          </RequireAuth>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;

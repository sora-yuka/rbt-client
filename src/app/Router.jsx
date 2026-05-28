import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<>Home page filler</>} />
      <Route path="/register" element={<>filler</>} />
      <Route path="/login" element={<>filler</>} />
    </Routes>
  </BrowserRouter>
);

export default Router;

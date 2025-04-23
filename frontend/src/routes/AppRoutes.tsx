import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import VotarPage from "../pages/VotarPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/votar" element={<VotarPage />} />
    </Routes>
  );
};

export default AppRoutes;

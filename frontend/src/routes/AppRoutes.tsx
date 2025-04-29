import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import VotarPage from "../pages/VotarPage";
import ResultadoVotacao from "../pages/ResultadoVotacao";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/votar" element={<VotarPage />} />
      <Route path="/resultadoVotacao" element={<ResultadoVotacao />} />
    </Routes>
  );
};

export default AppRoutes;

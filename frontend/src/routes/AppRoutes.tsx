import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import VotarPage from "../pages/VotarPage";
import ResultadoVotacao from "../pages/ResultadoVotacao";
import { PrivateRoute } from "../components/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/votar"
        element={
          <PrivateRoute>
            <VotarPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/resultadoVotacao"
        element={
          <PrivateRoute>
            <ResultadoVotacao />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

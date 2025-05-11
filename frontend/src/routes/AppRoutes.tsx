import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import VotarPage from "../pages/VotarPage";
import ResultadoVotacao from "../pages/ResultadoVotacao";
import { PrivateRoute } from "../components/PrivateRoute";

// Componente responsável por definir as rotas da aplicação.
// Utiliza rotas protegidas (PrivateRoute) para garantir que somente usuários autenticados
// possam acessar as páginas de votação e resultado.
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota pública para login */}
      <Route path="/" element={<Login />} />
      {/* Rota protegida para a página de votação */}
      <Route
        path="/votar"
        element={
          <PrivateRoute>
            <VotarPage />
          </PrivateRoute>
        }
      />
      {/* Rota protegida para a página de resultado da votação */}
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

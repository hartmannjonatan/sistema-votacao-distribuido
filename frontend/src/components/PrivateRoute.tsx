import { Navigate } from "react-router-dom";
import { JSX } from "react";
import { useVotingContract } from "../hooks/useVotingContract";

interface PrivateRouteProps {
  children: JSX.Element;
}

// Componente de rota protegida que só permite acesso se o usuário estiver autenticado
export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useVotingContract(); // Verifica se o usuário está autenticado

  // Se não estiver autenticado, redireciona para a página inicial
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

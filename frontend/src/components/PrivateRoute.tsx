import { Navigate } from "react-router-dom";
import { JSX } from "react";
import { useVotingContract } from "../hooks/useVotingContract";

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useVotingContract();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

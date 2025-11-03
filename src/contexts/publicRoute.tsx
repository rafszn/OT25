import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { Commet } from "react-loading-indicators";
import { useAuth } from "./AuthContext";

const PublicRoute = ({ element: Component }: { element: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Commet color="#D9CB48" size="large" text="" textColor="" />
      </div>
    );
  }
  return isAuthenticated ? <Navigate to="/v1/console" replace /> : Component;
};

export default PublicRoute;

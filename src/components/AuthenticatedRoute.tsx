import { RouteProps, Route, Redirect } from "react-router-dom";
import React from "react";
import { useAuthStore } from "utils/useAuthStore";

const AuthenticatedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const auth = useAuthStore();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated ? (
          children
        ) : (
          <Redirect to={`/login?redirect_to=${encodeURIComponent(location.pathname)}`} />
        )
      }
    />
  );
};

export default AuthenticatedRoute;

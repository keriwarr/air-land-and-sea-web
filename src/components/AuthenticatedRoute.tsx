import { RouteProps, Route, Redirect } from "react-router-dom";
import React from "react";
import { useAuthStore } from "utils/useAuthStore";
import { observer } from "mobx-react";

const AuthenticatedRoute: React.FC<RouteProps> = observer(
  ({ children, ...rest }) => {
    const { isAuthenticating, isAuthenticated } = useAuthStore();

    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticating ? (
            <div>Loading...</div>
          ) : isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={`/login?redirect_to=${encodeURIComponent(location.pathname)}`}
            />
          )
        }
      />
    );
  }
);

export default AuthenticatedRoute;

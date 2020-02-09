import React from "react";
import { observer } from "mobx-react";
import { useAuthStore } from "utils/useAuthStore";
import AuthenticatedHome from "./AuthenticatedHome";
import UnauthenticatedHome from "./UnauthenticatedHome";
import { UnauthenticatedAuthStore, AuthenticatedAuthStore } from "stores/auth";

const Home: React.FC = observer(() => {
  const auth = useAuthStore();

  return auth.isAuthenticated ? (
    <AuthenticatedHome auth={auth as AuthenticatedAuthStore} />
  ) : (
    <UnauthenticatedHome auth={auth as UnauthenticatedAuthStore} />
  );
});

export default Home;

import React from "react";
import { observer } from "mobx-react";
import { useAuthStore } from "utils/useAuthStore";
import AuthenticatedHome from "./AuthenticatedHome";
import UnauthenticatedHome from "./UnauthenticatedHome";
import { UnauthenticatedStore } from "stores/auth";

const Home: React.FC = observer(() => {
  const auth = useAuthStore();

  return auth.isAuthenticated() ? (
    <AuthenticatedHome auth={auth} />
  ) : (
    <UnauthenticatedHome auth={auth as UnauthenticatedStore} />
  );
});

export default Home;

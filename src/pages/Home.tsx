import React from "react";
import { observer } from "mobx-react";
import { useAuthStore } from "utils/useAuthStore";

const Home: React.FC = observer(() => {
  const auth = useAuthStore();

  return (
    <div>{auth.isAuthenticated() ? `Hello ${auth.displayName()}.` : "Home"}</div>
  );
});

export default Home;

import React from "react";
import { observer } from "mobx-react";
import { useAuthStore } from "utils/useAuthStore";

const Home: React.FC = observer(() => {
  const auth = useAuthStore();

  return (
    <div>{auth.isAuthentiated() ? `Hello, ${auth.email()}.` : "Home"}</div>
  );
});

export default Home;

import React from "react";
import { useHistory } from "react-router-dom";
import { useAuthStore } from "utils/useAuthStore";

const LogoutButton: React.FC = () => {
  const history = useHistory();
  const auth = useAuthStore();

  return <button onClick={() => auth.logout(history)}>Log out</button>;
};

export default LogoutButton;

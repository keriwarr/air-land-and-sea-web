import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthStore } from "utils/useAuthStore";

const LogoutButton: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuthStore();

  return <button onClick={() => auth.logout(history, location)}>Log out</button>;
};

export default LogoutButton;

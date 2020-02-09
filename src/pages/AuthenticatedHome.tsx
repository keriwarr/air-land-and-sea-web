import React from "react";
import { AuthenticatedAuthStore } from "stores/auth";

interface IProps {
  auth: AuthenticatedAuthStore;
}

const AuthenticatedHome: React.FC<IProps> = ({ auth }) => {
  return <div>Hello, {auth.displayName()}</div>;
};

export default AuthenticatedHome;

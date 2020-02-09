import React from "react";
import { AuthenticatedStore } from "stores/auth";

interface IProps {
  auth: AuthenticatedStore;
}

const AuthenticatedHome: React.FC<IProps> = ({ auth }) => (
  <div>Hello, {auth.displayName()}</div>
);

export default AuthenticatedHome;

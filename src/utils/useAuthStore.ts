import AuthStore from "stores/auth";
import { useContext } from "react";
import { StoreContext } from "../index";

export const useAuthStore = (): AuthStore => useContext(StoreContext);

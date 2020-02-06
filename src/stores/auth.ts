import * as firebase from "firebase";
import { observable, action } from "mobx";

export default class AuthStore {
  @observable
  private user: firebase.User | null = null;

  constructor() {
    this.initiateFirebaseListener();
  }

  // @computed
  public readonly isAuthentiated = (): this is { user: firebase.User } => {
    return this.user !== null;
  };

  public email(this: AuthStore & { user: firebase.User }): string;
  // @computed
  public email(this: AuthStore): string | null {
    return this.user && this.user.email;
  }

  @action
  private readonly setUser = (user: firebase.User | null) => {
    this.user = user;
  };

  private readonly initiateFirebaseListener = () => {
    firebase.auth().onAuthStateChanged(this.setUser);
  };
}

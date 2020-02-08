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

  public displayName(this: AuthStore & { user: firebase.User }): string;
  // @computed
  public displayName(this: AuthStore): string | null {
    return this.user && (this.user.displayName || '');
  }

  public uid(this: AuthStore & { user: firebase.User }): string;
  // @computed
  public uid(this: AuthStore): string | null {
    return this.user && (this.user.uid);
  }

  @action
  private readonly setUser = (user: firebase.User | null) => {
    this.user = user;
  };

  public setDisplayName(displayName: string) {
    if (!this.user) {
      return Promise.resolve();
    }

    return this.user.updateProfile({
      displayName
    });
  }

  private readonly initiateFirebaseListener = () => {
    firebase.auth().onAuthStateChanged(this.setUser);
  };
}

import firebase from "firebase/app";
import { observable, action, when } from "mobx";
import { History } from "history";

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
    return this.user && (this.user.displayName || "");
  }

  public uid(this: AuthStore & { user: firebase.User }): string;
  // @computed
  public uid(this: AuthStore): string | null {
    return this.user && this.user.uid;
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

  public readonly signup = async (history: History, displayName: string, email: string, password: string) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      await when(() => this.isAuthentiated());

      await this.setDisplayName(displayName);

      history.push("/");
    } catch (e) {
      console.error(e);
    }
  }

  public readonly login = async (history: History, email: string, password: string) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      history.push("/");
    } catch (e) {
      console.error(e);
    }
  }

  public readonly logout = async (history: History) => {
    try {
      await firebase.auth().signOut();

      // if not already at '/' ?
      history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  private readonly initiateFirebaseListener = () => {
    firebase.auth().onAuthStateChanged(this.setUser);
  };
}

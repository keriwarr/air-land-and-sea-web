import firebase from "firebase/app";
import { observable, action, when } from "mobx";
import { History, Location } from "history";
import queryString from "query-string";

export default class AuthStore {
  @observable
  private user: firebase.User | null = null;

  constructor() {
    this.initiateFirebaseListener();
  }

  // @computed
  public readonly isAuthenticated = (): this is { user: firebase.User } => {
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

  public readonly signup = async (
    history: History,
    displayName: string,
    email: string,
    password: string
  ) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      await when(() => this.isAuthenticated());

      await this.setDisplayName(displayName);

      history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  public readonly login = async (
    history: History,
    location: Location,
    email: string,
    password: string
  ) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      const redirectTo = queryString.parse(location.search)["redirect_to"];
      const nextUrl = Array.isArray(redirectTo)
        ? decodeURIComponent(redirectTo[0])
        : redirectTo
        ? decodeURIComponent(redirectTo)
        : "/";

      history.push(nextUrl);
    } catch (e) {
      console.error(e);
    }
  };

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

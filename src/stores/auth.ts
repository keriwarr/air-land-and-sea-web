import firebase from "firebase/app";
import { observable, action, when } from "mobx";
import { History, Location } from "history";
import queryString from "query-string";

export type AuthenticatedStore = AuthStore & { user: firebase.User };
export type UnauthenticatedStore = AuthStore & { user: null };

export default class AuthStore {
  @observable
  private user: firebase.User | null = null;

  constructor() {
    this.initiateFirebaseListener();
  }

  // @computed
  public readonly isAuthenticated = (): this is AuthenticatedStore => {
    return this.user !== null;
  };

  public email(this: AuthenticatedStore): string;
  public email(this: UnauthenticatedStore): null;
  // @computed
  public email(this: AuthStore): string | null {
    if (this.user && this.user.email === null) {
      throw new Error("User does not have an email!!");
    }
    return this.user && this.user.email;
  }

  public displayName(this: AuthenticatedStore): string;
  public displayName(this: UnauthenticatedStore): null;
  // @computed
  public displayName(this: AuthStore): string | null {
    return this.user && (this.user.displayName || "");
  }

  public uid(this: AuthenticatedStore): string;
  public uid(this: UnauthenticatedStore): null;
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

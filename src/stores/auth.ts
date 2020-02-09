import firebase from "firebase/app";
import { observable, action, when, computed } from "mobx";
import { History, Location } from "history";
import queryString from "query-string";

export type AuthenticatedAuthStore = AuthStore & { user: firebase.User };
export type UnauthenticatedAuthStore = AuthStore & { user: null };

export default class AuthStore {
  @observable
  private userData: {
    email: string;
    displayName: string | null;
    uid: string;
    userObject: firebase.User;
  } | null = null;

  constructor() {
    this.initiateFirebaseListener();
  }

  @computed
  public get isAuthenticated() {
    return this.userData !== null && this.userData.displayName !== null;
  }

  public email(this: AuthenticatedAuthStore): string;
  public email(this: UnauthenticatedAuthStore): null;
  public email(this: AuthStore): string | null;
  // @computed
  public email(this: AuthStore): string | null {
    if (this.userData && this.userData.email === null) {
      throw new Error("User does not have an email!!");
    }
    return this.userData && this.userData.email;
  }

  public displayName(this: AuthenticatedAuthStore): string;
  public displayName(this: UnauthenticatedAuthStore): null;
  public displayName(this: AuthStore): string | null;
  // @computed
  public displayName(this: AuthStore): string | null {
    if (this.userData && this.userData.displayName === null) {
      throw new Error("User does not have a display name!!");
    }
    return this.userData && this.userData.displayName;
  }

  public uid(this: AuthenticatedAuthStore): string;
  public uid(this: UnauthenticatedAuthStore): null;
  public uid(this: AuthStore): string | null;
  // @computed
  public uid(this: AuthStore): string | null {
    return this.userData && this.userData.uid;
  }

  @action
  private readonly setUser = (user: firebase.User | null) => {
    if (user === null) {
      this.userData = null;
      return;
    }
    if (user.email === null) {
      throw new Error("User email must not be null");
    }
    this.userData = {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      userObject: user
    };
  };

  public readonly saveDisplayName = async (displayName: string) => {
    if (!this.userData) {
      throw new Error("This must only be called when authenticated");
    }

    await this.userData.userObject.updateProfile({
      displayName
    });

    await this.userData.userObject.reload();

    this.setUser(firebase.auth().currentUser);
  };

  public readonly signup = async (
    history: History,
    location: Location,
    displayName: string,
    email: string,
    password: string
  ) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await when(() => this.userData !== null);

      await this.saveDisplayName(displayName);
      await when(() => this.isAuthenticated);

      if (`${location.pathname}${location.search}` !== "/") {
        history.push("/");
      }
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

      await when(() => this.isAuthenticated);

      const redirectTo = queryString.parse(location.search)["redirect_to"];
      const nextUrl = Array.isArray(redirectTo)
        ? decodeURIComponent(redirectTo[0])
        : redirectTo
        ? decodeURIComponent(redirectTo)
        : "/";

      if (nextUrl !== location.pathname) {
        history.push(nextUrl);
      }
    } catch (e) {
      console.error(e);
    }
  };

  public readonly logout = async (history: History, location: Location) => {
    try {
      await firebase.auth().signOut();

      if (`${location.pathname}${location.search}` !== "/") {
        history.push("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  private readonly initiateFirebaseListener = () => {
    firebase.auth().onAuthStateChanged(this.setUser);
  };
}

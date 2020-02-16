import firebase from "firebase/app";
import { observable, action, when, computed } from "mobx";
import { History, Location } from "history";
import queryString from "query-string";

interface UserData {
  email: string;
  displayName: string | null;
  uid: string;
  userObject: firebase.User;
}

export type AuthenticatedAuthStore = AuthStore & { user: UserData };
export type UnauthenticatedAuthStore = AuthStore & { user: null };

export default class AuthStore {
  @observable
  private userData: UserData | null = null;

  @observable
  private firebaseAuthStateKnown = false;

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

  /**
   * @throws
   */
  public readonly signup = async (
    history: History,
    location: Location,
    displayName: string,
    email: string,
    password: string
  ) => {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION);
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await when(() => this.userData !== null);

    await this.saveDisplayName(displayName);
    await when(() => this.isAuthenticated);

    const redirectTo = queryString.parse(location.search)["redirect_to"];
    const nextUrl = Array.isArray(redirectTo)
      ? decodeURIComponent(redirectTo[0])
      : redirectTo
      ? decodeURIComponent(redirectTo)
      : "/";

    if (nextUrl !== `${location.pathname}${location.search}`) {
      history.push(nextUrl);
    }
  };

  public readonly getPrefersStaySignedIn = () => {
    return localStorage["prefersStaySignedIn"] === "true";
  };

  public readonly setPrefersStaySignedIn = (staySignedIn: boolean) => {
    if (staySignedIn) {
      localStorage["prefersStaySignedIn"] = "true";
    } else {
      delete localStorage["prefersStaySignedIn"];
    }
  };

  @computed
  public get isProbablyLoggedIn() {
    return (
      !this.firebaseAuthStateKnown && localStorage["wasPreviouslyAuthenticated"]
    );
  }

  private readonly setWasPreviouslyAuthenticated = (
    previouslyAuthenticated: boolean
  ) => {
    if (previouslyAuthenticated) {
      localStorage["wasPreviouslyAuthenticated"] = "true";
    } else {
      delete localStorage["wasPreviouslyAuthenticated"];
    }
  };

  /**
   * @throws
   */
  public readonly login = async (
    history: History,
    location: Location,
    email: string,
    password: string,
    staySignedIn: boolean
  ) => {
    if (staySignedIn) {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    } else {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }

    await firebase.auth().signInWithEmailAndPassword(email, password);

    await when(() => this.isAuthenticated);

    this.setPrefersStaySignedIn(staySignedIn);
    this.setWasPreviouslyAuthenticated(staySignedIn);

    const redirectTo = queryString.parse(location.search)["redirect_to"];
    const nextUrl = Array.isArray(redirectTo)
      ? decodeURIComponent(redirectTo[0])
      : redirectTo
      ? decodeURIComponent(redirectTo)
      : "/";

    if (nextUrl !== `${location.pathname}${location.search}`) {
      history.push(nextUrl);
    }
  };

  /**
   * @throws
   */
  public readonly resetPassword = async (email: string) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  /**
   * @throws
   */
  public readonly logout = async (history: History, location: Location) => {
    await this.teardownPresence();
    await firebase.auth().signOut();

    this.setWasPreviouslyAuthenticated(false);

    if (`${location.pathname}${location.search}` !== "/") {
      history.push("/");
    }
  };

  private readonly initiateFirebaseListener = () => {
    firebase.auth().onAuthStateChanged(async user => {
      this.setUser(user);
      this.firebaseAuthStateKnown = true;

      if (user) {
        this.setupPresence();
      }
    });
  };

  private readonly setupPresence = () => {
    firebase
      .database()
      .ref(".info/connected")
      .on("value", async snapshot => {
        if (snapshot.val() === false) {
          return;
        }

        var userNameOnlineRef = firebase
          .database()
          .ref("/users-online/" + this.uid());

        try {
          await userNameOnlineRef.onDisconnect().set(null);
          await userNameOnlineRef.set({
            id: this.uid(),
            displayName: this.displayName()
          });
        } catch (e) {
          console.error(e);
        }
      });
  };

  private readonly teardownPresence = async () => {
    var userNameOnlineRef = firebase
      .database()
      .ref("/users-online/" + this.uid());

    try {
      await userNameOnlineRef.set(null);
    } catch (e) {
      console.error(e);
    }
  };
}

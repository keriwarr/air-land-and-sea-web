export const getHomeErrorText = (errorCode: string): string | null => {
  if (errorCode === "game_full") {
    return "Sorry, that game is already full!";
  }

  return null;
};

export const getLoginErrorText = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-disabled":
      return "Account has been disabled.";
    case "auth/user-not-found":
      return "Account does not exist.";
    case "auth/wrong-password":
      return "Incorrect password.";
    default:
      return "Something went wrong.";
  }
};

export const getSignupErrorText = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Email already in use.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/weak-password":
      return "Password not strong enough.";
    default:
      return "Something went wrong.";
  }
};

export const getPasswordResetErrorText = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-not-found":
      return "Account does not exist.";
    default:
      return "Something went wrong.";
  }
};

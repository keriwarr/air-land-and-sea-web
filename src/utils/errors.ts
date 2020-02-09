export const getHomeErrorText = (errorCode: string): string | null => {
  if (errorCode === "game_full") {
    return "Sorry, that game is already full!";
  }

  return null;
};

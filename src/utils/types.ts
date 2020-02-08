type NotNull<T> = T extends null ? never : T;
export const isNotNull = <T>(arg: T): arg is NotNull<T> => arg !== null;

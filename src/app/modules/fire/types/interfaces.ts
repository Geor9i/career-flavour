export interface Conditional<T, S> {
  name: S;
  value: T | null;
}


export interface UserData {
  [key: string]: string
}

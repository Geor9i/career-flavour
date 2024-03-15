export interface RegexSymbol {
  symbol: string;
  matchLimit?: number;
  remove?: boolean;
}

export interface FormValues {
  [key: string]: string;
}

export interface FormDataFields {
  email: string;
  password: string;
  // Add other properties as needed
}

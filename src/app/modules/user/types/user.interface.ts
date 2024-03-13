
export interface UserInterface {
  email: string;
  password: string;
}

export interface UserRegisterInterface extends UserInterface {
  firstName: string;
  lastName: string;
}

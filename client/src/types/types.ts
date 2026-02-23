export interface ISignUpForm {
  name: string;
  email: string;
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IAuthUser {
  id: string;
  name: string;
  pfp: string | null;
}

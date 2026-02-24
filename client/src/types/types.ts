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
  profilePicture: string | null;
}

export interface IMessage {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  text: string | null;
  image: string | null;
  senderId: string;
  receiverId: string;
}

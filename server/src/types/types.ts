export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  profilePicture: string;
}

export interface IMessage {
  id: string;
  text?: string;
  image?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

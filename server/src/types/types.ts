export interface IUser {
  id: string;
  name: string;
  email?: string;
  password?: string;
  profilePicture: string | null;
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

declare module "socket.io" {
  interface Socket {
    user?: IUser;
    userId?: string;
  }
}


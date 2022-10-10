export {};

interface User {
  id: string;
  token: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  moods?: Mood[];
}

interface Mood {
  id: string;
  coffeeType: string;
  content: string;
  createdAt: Date;
}

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}

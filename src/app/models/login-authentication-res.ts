export interface LoginAuthenticationRes {
  accessToken: string;
  user: User;
}

interface User {
  id: number;
  username: string;
}

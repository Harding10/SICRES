export interface User {
  id: number;
  name: string;
  username: string;
  role: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
export interface CreateUser {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin" | "moderator" | undefined;
}

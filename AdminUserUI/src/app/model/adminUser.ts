export interface AdminUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string; // Typically, passwords are not sent back to the client
    confirmPassword: string;
    role: string;
  }

export interface UserLogin{
    email: string;
    password: string;
}
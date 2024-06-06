export type UserRole =
  'ADMIN' |
  'TUTOR' |
  'STUDENT' |
  'UNASSIGNED'


export enum VerificationTokenType {
  'VERIFICATION-TOKEN',
  'FORGOT-PASSWORD-TOKEN',
}

export type AuthenticationStrategy = 'google' | 'local'

export interface User {
  email: string;
  verified_email: boolean;
  strategy: 'google' | 'local';
  password: string;
  given_name: string;
  family_name: string;
  picture?: string;
  role: UserRole;
}

export interface AuthenticatedUser extends Omit<User, 'password'> {
  jwt_token: string;
}

export interface UserFromDb extends User {
  id: number;
  updatedAt: Date,
  createdAt: Date,
}

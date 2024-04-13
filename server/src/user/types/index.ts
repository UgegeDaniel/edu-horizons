export enum UserRoles { 'admin' , 'tutor' , 'student' , 'unassigned'}

export interface User {    email: string;
    verified_email: boolean;
    strategy: 'google' | 'local';
    password: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
  role: UserRoles;
  }

  export interface AuthenticatedUser extends User {
    jwt_token: string;
  }

  export interface UserFromDb extends User {
    id: number;
  }
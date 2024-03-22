export interface User {
    // id: string;
    email: string;
    verified_email: boolean;
    strategy: 'google' | 'local';
    password: string;
    name: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    role: 'admin' | 'tutor' | 'student' | 'unassigned';
  }

  export interface AuthenticatedUser extends User {
    jwt_token: string;
  }

  export interface UserFromDb extends User {
    id: number;
  }
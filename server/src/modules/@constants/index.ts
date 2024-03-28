import { config } from 'dotenv';

config();

export const BASE_ROUTE =
  process.env.ENVIRONMENT === 'development'
    ? 'http://localhost:5000/'
    : 'https://edu-horizons.onrender.com/';

export const PROFILE_ROUTE = BASE_ROUTE + 'users/profile';

export const GOOGLE_TOKEN_LINK = 'https://accounts.google.com/o/oauth2/token';

export const GOOGLE_PROFILE_LINK =
  'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=';

export const GOOGLE_TOKEN_REFRESH_LINK =
  'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';


export const GOOGLE_REVOKE_TOKEN_LINK =
  'https://accounts.google.com/o/oauth2/revoke?token=';

export const GOOGLE_REDIRECT_URI = `${BASE_ROUTE}users/auth/google/redirect`;

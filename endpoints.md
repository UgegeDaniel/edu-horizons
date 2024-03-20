## AUTH

1. **Endpoint**: `/users/auth/google`
   - **Method**: `GET`
   - **Access**: Public
   - **Description**: Initiates the Google authentication process.

2. **Endpoint**: `/users/auth/google/redirect`
   - **Method**: `GET`
   - **Access**: Public
   - **Description**: Callback route for Google authentication. Handles redirection after successful Google authentication.

3. **Endpoint**: `/users/auth/local/register`
   - **Method**: `POST`
   - **Access**: Public
   - **Description**: Registers a new user using local authentication strategy.

4. **Endpoint**: `/users/auth/local/login`
   - **Method**: `POST`
   - **Access**: Public
   - **Description**: Logs in a user using local authentication strategy.

5. **Endpoint**: `/users/profile`
   - **Method**: `GET`
   - **Access**: Protected (CheckTokenExpiryGuard)
   - **Description**: Retrieves the user profile. Requires a valid access token.

6. **Endpoint**: `/users/logout`
   - **Method**: `GET`
   - **Access**: Public
   - **Description**: Logs out the user by revoking the access token.
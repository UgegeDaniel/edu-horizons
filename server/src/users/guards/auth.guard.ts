import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CheckTokenExpiryGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Log cookies for debugging
    console.log('Cookies:', request.cookies);

    // Get access token from cookies
    const accessToken = request.cookies['access_token'];

    // Check if access token is expired
    if (accessToken && await this.usersService.isTokenExpired(accessToken)) {
      const refreshToken = request.cookies['refresh_token'];

      // Check if refresh token is available
      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token not found');
      }

      try {
        // Refresh access token
        const newAccessToken = await this.usersService.getNewAccessToken(refreshToken);
        
        // Update access token in response cookies
        request.res.cookie('access_token', newAccessToken, { httpOnly: true });
        request.cookies['access_token'] = newAccessToken;
      } catch (error) {
        throw new UnauthorizedException('Failed to refresh token');
      }
    }

    // Allow the request to proceed
    return true;
  }
}

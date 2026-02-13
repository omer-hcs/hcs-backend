import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { getAuth } from '../../lib/auth';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Better-auth needs headers to verify session
    const auth = await getAuth();
    const { fromNodeHeaders } = await import('better-auth/node');
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(request.headers),
    });

    if (!session) {
      throw new UnauthorizedException('Please login to access this resource');
    }

    // Optional: Check for admin role if multiple roles exist
    // For now, any authenticated user is considered an admin for this MVP
    request.user = session.user;
    
    return true;
  }
}

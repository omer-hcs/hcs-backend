import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { getAuth } from '../../lib/auth';
import { toNodeHandler } from 'better-auth/node';

@Controller('auth')
export class AuthController {
  @All('*')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    console.log(`[Auth] Handling request: ${req.method} ${req.url}`);
    const auth = await getAuth();
    return toNodeHandler(auth)(req, res);
  }
}

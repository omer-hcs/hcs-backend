import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { auth } from '../../lib/auth';
import { toNodeHandler } from 'better-auth/node';

@Controller('auth')
export class AuthController {
  @All('*')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    console.log(`[Auth] Handling request: ${req.method} ${req.url}`);
    return toNodeHandler(auth)(req, res);
  }
}

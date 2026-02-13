import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { getAuth } from '../../lib/auth';

@Controller('auth')
export class AuthController {
  @All('*')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    console.log(`[Auth] Handling request: ${req.method} ${req.url}`);
    const auth = await getAuth();
    // Use eval to prevent TypeScript from transpiling import() to require()
    const { toNodeHandler } = await (eval('import("better-auth/node")') as Promise<typeof import("better-auth/node")>);
    return toNodeHandler(auth)(req, res);
  }
}

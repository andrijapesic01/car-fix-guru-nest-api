import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoacalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor( private authService: AuthService) {}
    
    @UseGuards(LoacalAuthGuard)
    @Post('login')
    public async login(@Request() req) {
        return this.authService.login(req.user);
    }
}

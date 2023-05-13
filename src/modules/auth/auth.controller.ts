import { Body, Controller, Get, Param, Post, Query, Session, UseGuards, Req } from '@nestjs/common';
import { AuthResponse, AuthSignInRequest, AuthSignUpRequest } from './dto/auth.dt';
import { AuthService } from './auth.service';
import { Auth } from '../../common/decorator/auth.decorator';
import { LoggedIn } from 'src/common/decorator/logged-in.decorator';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('sign-up')
    async signUp( @Body() signUpRequest: AuthSignUpRequest): Promise<AuthResponse>{
        const model = await this.authService.signUp(signUpRequest)
        return model
    }

    @Auth()
    @Post('sign-in')
    async signIn(@Req() req,){
        const sessionId = req.sessionID
        return { 
            sessionId,
            ...req.user, 
        }
    }

    @Post('refresh-token')
    async refreshToken(){}

    @LoggedIn()
    @Get('test')
    getUser(@Req() req, @Session() session: Record<string, any>){
        console.log(session)
        return req.sessionID
    }
    
}

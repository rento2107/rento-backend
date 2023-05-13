import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponse, AuthSignInRequest, AuthSignUpRequest, AuthSignInResponse } from './dto/auth.dt';
import { User, UsersDbService } from 'src/database/postgres/user/user.database.service';
import * as argon from 'argon2'

@Injectable()
export class AuthService {
    constructor(private readonly userDbService: UsersDbService){}

    async signUp( singUpRequest: AuthSignUpRequest): Promise<AuthResponse>{
        const hash = await argon.hash(singUpRequest.password)
        singUpRequest.password = hash
        const model = await this.userDbService.postUser(singUpRequest)
        return model
    }

    async signIn(signInRequest: AuthSignInRequest): Promise<User>{
        const user = await this.userDbService.getUserHash(signInRequest)
        const isPasswordMatched = await argon.verify(user.hash, signInRequest.password)
        if(!isPasswordMatched){
            throw new UnauthorizedException(`Username and password combination do not Match`)
        }
        return {
            sub: user.sub,
            role: user.role
        }
    }

}

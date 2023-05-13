import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User, UserWithHash, UsersDbService } from "src/database/postgres/user/user.database.service";
import { AuthSignInRequest, AuthSignInResponse } from "../dto/auth.dt";

@Injectable()
export class SessionSerializer extends PassportSerializer{
    constructor(private readonly userDbService: UsersDbService){
        super()
    }

    serializeUser(user: any, done: (err, user: any) => void) {
        console.log('serializer working', user)
        done(null, user)
    }

    async deserializeUser(user: any, done: (err, user: any) => void) {
        console.log('deserializer working')
        console.log(user)
        const userModel = await this.userDbService.getUserByUserId({ sub: user.sub})
        return userModel ? done(null, user) : done(null, null)
    }
}
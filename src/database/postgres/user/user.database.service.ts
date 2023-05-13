// users.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AuthResponse, AuthSignInRequest } from '../../../modules/auth/dto/auth.dt'
import { Repository } from 'typeorm';

export interface User{
  sub: number;
  role: string;
}

export interface UserWithHash extends User {
  displayName: string;
  hash: string;
}

export interface UpdateRefreshToken {
  userName: string,
  refresh_token: string,
}

@Injectable()
export class UsersDbService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async postUser(user: Partial<UserEntity>): Promise<AuthResponse>{
    const model = await this.userRepository.save(user)
    return this.mapUserToAuthRespone(model)
  }

  async getUserByUserId({ sub }: { sub: number}){
    try{
      console.log(sub)
      const user = await this.userRepository.findOneOrFail({ where: [{ userId: sub}]})
      return {
        sub: user.userId,
        role: user.role
      }
    }catch(error){
      throw new UnauthorizedException(`Username and password combination do not Match`)
    }
  }

  async getUserByUserName({ username }: {username: string}): Promise<UserEntity>{
    try{
      console.log(username)
      const user = await this.userRepository.findOneOrFail({
        where: [
          { email: username},
          { displayName: username},
          { phoneNumber: username},
        ]
      })
      return user
    } catch (error){
      throw new UnauthorizedException(`Username and password combination do not Match`)
    }
  }

  async getUserHash({ username }: {username: string}): Promise<UserWithHash>{
    try{
      const model = await this.getUserByUserName({username})
      return {
        sub: model.userId,
        displayName: model.displayName,
        hash: model.password,
        role: model.role,
      }
    } catch (error){
      throw new UnauthorizedException(`Username and password combination do not Match`)
    }
  }

  async updateUserRefreshToken( refreshToken: UpdateRefreshToken){
    const user = await this.getUserByUserName({ username: refreshToken.userName})
    user.refreshToken = refreshToken.refresh_token
    const model = await this.userRepository.save(user)
    return model
  }

  mapUserToAuthRespone(user: UserEntity): AuthResponse {
    return {
      displayName: user.displayName,
      role: user.role,
    }
  }
}

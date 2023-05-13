// db.module.ts
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDbService } from './postgres/user/user.database.service';
import { UserEntity } from 'src/entities/user.entity';

const reposities = [UserEntity]
const services = [UsersDbService]
@Global()
@Module({
  imports: [TypeOrmModule.forFeature(reposities)],
  providers:  [...services],
  exports: [...services],
})
export class DatabaseModule {}

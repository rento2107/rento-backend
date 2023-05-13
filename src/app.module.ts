import {
  Inject,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from './shared/tyeporm.config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { REDIS, SharedModule } from './shared/shared.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import * as session from 'express-session'
import * as passport from 'passport'
import { ConfigService } from './shared/config.service';
import * as redis from 'redis'
import * as RedisStore from 'connect-redis';
import { throws } from 'assert';

@Module({
  imports: [

    ...typeOrmAsyncConfig.map((typeOrmConfig) => TypeOrmModule.forRootAsync(typeOrmConfig)),
    PassportModule.register({
      session: true,
    }),
    SharedModule,
    UserModule,
    DatabaseModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
  constructor(private readonly configService: ConfigService, @Inject(REDIS) private readonly client: redis.RedisClient){
  }
  configure(consumer: MiddlewareConsumer){
    consumer.apply(
      session({
        store: new (RedisStore(session))({ client: this.client, logErrors: true }),
        name: 'rento',
        secret: this.configService.get('SESSION_SECRET'),
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 1000*60*15,
          httpOnly: false,
        },
      }),
      passport.initialize(),
      passport.session()
    )
    .forRoutes('*')
  }
}

import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as Redis from 'redis'
import { config } from 'dotenv';

const services = [ConfigService, /*RedisCacheManager*/]
export const REDIS = Symbol('AUTH:REDIS')
@Global()
@Module({
    imports: [],
    providers: [
        ...services,
        {
            provide: REDIS,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const client = Redis.createClient({
                    host: configService.get('REDIS_HOST'),
                    port: parseInt(configService.get('REDIS_PORT')),
                    password: configService.get('REDIS_PASSWORD')
                })
                return client
            }
        },
    ],
    exports: [...services, REDIS],
})
export class SharedModule {}

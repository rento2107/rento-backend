import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisCacheManager } from './shared/cache-manager.service';
import { RedisKeyValue } from './shared/dto/redis.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, /*private readonly redis: RedisCacheManager*/) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('redis')
  // redisTest(@Body() redisKeyValue: RedisKeyValue): Promise<string> {
  //   return this.redis.setGetKeyValueTest(redisKeyValue);
  // }
}

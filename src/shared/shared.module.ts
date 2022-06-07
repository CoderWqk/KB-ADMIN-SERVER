import { CacheModule, Global, Module } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule } from "src/config/config.module";
import { ConfigService } from "src/config/config.service";
import { RedisModule } from "./redis/redis.module";
import { RedisService } from "./services/redis.service";
import { UtilsService } from "./services/utils.service";

// common provider list
const providers = [UtilsService, RedisService];

@Global()
@Module({
  imports: [
    // redis cache
    CacheModule.register(),
    RedisModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          host: configService.get('HOST'),
          port: parseInt(configService.get('PORT')),
          password: configService.get('PASSWORD'),
          db: parseInt(configService.get('DB'))
        };
      }
    }),
  ],
  providers: [...providers],
  exports: [...providers]
})
export class SharedModule { }
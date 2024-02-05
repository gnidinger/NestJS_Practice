import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './domain/user/modules/user.module';
import { AuthModule } from './domain/user/modules/auth.module';
import { FeedModule } from './domain/board/modules/feed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UserModule,
    AuthModule,
    FeedModule,
  ],
})
export class AppModule {}

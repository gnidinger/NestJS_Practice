import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfigAsync = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: configService.get('STAGE') === 'dev', // 예를 들어, 'STAGE' 환경 변수를 사용하여 개발 환경인지 확인
    dropSchema: configService.get('STAGE') === 'dev',
  }),
  inject: [ConfigService],
};

import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        // limit number of connections as we have low cost db
        extra: {
          max: 1, // set pool max size
        },
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    QuestionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

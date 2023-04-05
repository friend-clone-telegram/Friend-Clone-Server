import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { join } from 'path';

import { AppController } from '../controllers/app.controller';

import { AppService } from '../services/app.service';
import { AuthorsResolver } from 'src/resolvers/user.resolver';
import { UsersModule } from './users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'postgres',
        host: configService.get('DB_HOST') || 'localhost',
        port: +configService.get<number>('DB_PORT') || 5432,
        username: configService.get('DB_USERNAME') || 'dev_user',
        password: configService.get('DB_PASSWORD') || 'dev_password',
        database: configService.get('DB_NAME') || 'dev_db',
        entities: [],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthorsResolver]
})
export class AppModule {}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';
import { CqrsModule } from '@nestjs/cqrs';
import { RabbitmqModule } from './infrastructure/message-bus/rabbitmq/config/rabbitmq.module';
import { VerifyTokenModule } from './features/verify-token/verify-token.module';
import { CreateScholarShipApplicationModule } from './features/create-scholarship-application/create-scholarship-application.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //for env and validation of entity (configmodule)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    VerifyTokenModule,
    CqrsModule,
    RabbitmqModule,
    CreateScholarShipApplicationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthenticationMiddleware)
    //   .exclude(
    //     { path: 'users/signin', method: RequestMethod.POST },
    //     { path: 'users/signup', method: RequestMethod.POST },
    //   )
    //   .forRoutes('*');
  }
}

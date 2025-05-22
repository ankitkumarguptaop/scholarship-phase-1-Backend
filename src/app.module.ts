import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';
import { CqrsModule } from '@nestjs/cqrs';
import { RabbitmqModule } from './infrastructure/message-bus/rabbitmq/config/rabbitmq.module';
import { VerifyTokenModule } from './features/verify-token/verify-token.module';
import { CreateScholarShipApplicationModule } from './features/create-scholarship-application/create-scholarship-application.module';
import { CreatePersonalDetailModule } from './features/create-personal-details/create-personal-details.module';
import { GetPersonalDetailModule } from './features/get-personal-details/get-personal-details.module';
import { ChanngeApplicationStatusModule } from './features/change-application-status/change-application-status.module';
import { CreateApplicantModule } from './features/create-applicant/create-applicant.module';
import { CreateAddressDetailModule } from './features/create-address-details/create-address-details.module';
import { GetAddressDetailModule } from './features/get-address-details/get-address-details.module';

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
    CreateScholarShipApplicationModule,
    CreatePersonalDetailModule,
    GetPersonalDetailModule,
    ChanngeApplicationStatusModule,
    CreateApplicantModule,
    CreateAddressDetailModule,
    GetAddressDetailModule
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

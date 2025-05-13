import { Module } from '@nestjs/common';

import { LazyLoadHandler } from './lazy-loader.service';

import { SignatureTypes } from './signature-types.service';
import { SendMailAccessTokenModule } from './mail-created/mail-created.module';

@Module({
  imports: [
    SendMailAccessTokenModule,
  ],
  providers: [SignatureTypes, LazyLoadHandler],
  exports: [SignatureTypes],
})
export class SignatureTypesModule {}

import { Injectable } from '@nestjs/common';

import { LazyLoadHandler } from './lazy-loader.service';

import { SendMailAccessTokenModule } from './mail-created/mail-created.module';
import { SendMailAccessTokenProcessor } from './mail-created/mail-created.processor';

@Injectable()
export class SignatureTypes {
  constructor(private readonly lazyLoader: LazyLoadHandler) {

  this.signatureTypes = {
    'user-service.mail-access-token-send': [
      this.lazyLoader.handle(SendMailAccessTokenModule, SendMailAccessTokenProcessor),
    ],
  };
  }
  public signatureTypes :Record<string, any[]>
  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}

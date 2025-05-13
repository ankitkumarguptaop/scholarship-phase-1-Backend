export class SendMailCommand {
    constructor(
      public readonly access_token: string,
      public readonly email: string,
    ) {}
  }
  
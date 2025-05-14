import { Event } from 'src/domain/common/event';

export class EmailSendSucessfully extends Event {
  constructor(payload) {
    super(payload);
    this.type = 'user-service.mail-access-token-send';
  }

  getBody() {
    return {
      mail: this.payload,
    };
  }
}

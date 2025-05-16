interface MailCreated {
  email: string;
  access_token: string;
}

export interface MailCreatedBody {
  uuid: string;
  fired_at: Date;
  mail: MailCreated;
}

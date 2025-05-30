export interface EmailData {
  id: number;
  type: string;
  subject: string;
  html: string;
}

export type sendEmail = {
  type: string;
  to: string;
  from: string;
};

export interface emailRes{
  message:string;
  info: {
    response: string;
    envelope: {
      from: string;
      to: string;
    };
    messageId: string;
  };
}

export interface errorResponse {
  message: string;
  error?: Error | undefined;
}
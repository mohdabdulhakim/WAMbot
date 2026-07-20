export interface MailMessage {
  to: string;
  subject: string;
  text: string;
}

export interface Mailer {
  send(message: MailMessage): Promise<void>;
}

/**
 * Development transport: logs emails to the console.
 * A real provider (SMTP, SES, Resend, ...) plugs in behind the same
 * interface in a later sprint without touching the auth service.
 */
export class ConsoleMailer implements Mailer {
  async send(message: MailMessage): Promise<void> {
    console.log(
      `\n[mailer] to=${message.to}\n[mailer] subject=${message.subject}\n[mailer] ${message.text}\n`,
    );
  }
}

export const mailer: Mailer = new ConsoleMailer();

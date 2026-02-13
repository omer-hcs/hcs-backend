import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('app.smtp.host'),
      port: this.configService.get<number>('app.smtp.port'),
      secure: false,
      auth: {
        user: this.configService.get<string>('app.smtp.user'),
        pass: this.configService.get<string>('app.smtp.pass'),
      },
    });
  }

  async sendAdminNotification(lead: {
    fullName: string;
    email: string;
    phone: string;
    interestType: string;
    message?: string | null;
  }): Promise<void> {
    try {
      // Hardcoded as per user request for specific notification email
      const adminEmail = 'omerhcs9@gmail.com'; 
      const clinicName = this.configService.get<string>('app.clinicName');

      this.logger.log(`Attempting to send admin notification to: ${adminEmail}`); // Debug log
      await this.transporter.sendMail({
        from: `"${clinicName}" <${this.configService.get<string>('app.smtp.user')}>`,
        to: adminEmail,
        subject: `New Lead: ${lead.fullName} — ${lead.interestType}`,
        html: `
          <h2>New Lead Received</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
            <tr><td style="padding: 8px; font-weight: bold;">Name</td><td style="padding: 8px;">${lead.fullName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;">${lead.email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;">${lead.phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Interest</td><td style="padding: 8px;">${lead.interestType}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Message</td><td style="padding: 8px;">${lead.message || 'N/A'}</td></tr>
          </table>
        `,
      });

      this.logger.log(`Admin notification sent for lead: ${lead.email}`);
    } catch (error) {
      console.error('EMAIL ERROR:', error); // Explicit console error
      this.logger.error(`Failed to send admin notification: ${(error as Error).message}`);
      // Gracefully handle — do not crash the API
    }
  }

  async sendUserConfirmation(lead: {
    fullName: string;
    email: string;
    interestType: string;
  }): Promise<void> {
    try {
      const clinicName = this.configService.get<string>('app.clinicName');

      await this.transporter.sendMail({
        from: `"${clinicName}" <${this.configService.get<string>('app.smtp.user')}>`,
        to: lead.email,
        subject: `Thank you for contacting ${clinicName}`,
        html: `
          <h2>Hello ${lead.fullName},</h2>
          <p>Thank you for reaching out to <strong>${clinicName}</strong>.</p>
          <p>We have received your inquiry regarding <strong>${lead.interestType.replace(/_/g, ' ')}</strong>.
          Our team will review your request and get back to you within 24–48 hours.</p>
          <p>If you need immediate assistance, please call our clinic directly.</p>
          <br/>
          <p>Warm regards,</p>
          <p><strong>${clinicName} Team</strong></p>
        `,
      });

      this.logger.log(`User confirmation sent to: ${lead.email}`);
    } catch (error) {
      this.logger.error(`Failed to send user confirmation: ${(error as Error).message}`);
      // Gracefully handle — do not crash the API
    }
  }
}

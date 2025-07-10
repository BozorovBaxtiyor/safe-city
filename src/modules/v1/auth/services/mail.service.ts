import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import transporter from 'src/common/config/nodemail.config';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendOtp(email: string, otp: string) {
        try {
            let info = await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Tasdiqlash kodi',
                text: `Sizning tasdiqlash kodingiz: ${otp}`,
                html: `
                        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
                        <div style="max-width: 400px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); margin: auto;">
                            <h2 style="color: #333;">Tasdiqlash kodi</h2>
                            <p style="color: #555;">Hisobingizni tasdiqlash uchun quyidagi kodni kiriting:</p>
                            <div style="font-size: 24px; font-weight: bold; padding: 10px; background: #007bff; color: white; display: inline-block; border-radius: 5px; letter-spacing: 3px;">
                            ${otp}
                            </div>
                            <p style="color: #777; font-size: 14px; margin-top: 20px;">Ushbu kod 5 daqiqa ichida eskiradi.</p>
                        </div>
                        </div>
                    `,
            });

            console.log('Message sent: %s', info.messageId);
            // console.log(this.mailerService);
        } catch (error) {
            console.log(error);
        }
    }
}

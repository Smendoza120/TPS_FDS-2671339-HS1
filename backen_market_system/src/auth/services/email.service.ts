import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailResetDto } from '../dto/email.dto';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true si tu servidor SMTP requiere una conexión segura
            auth: {
                user: process.env.API_EMAIL,
                pass: process.env.API_EMAIL_PASSWORD,
            },
        });
    }
    async sendPasswordResetEmail(emailDto: EmailResetDto, resetLink: string) {
        const mailOptions = {
          from: 'notificationsr@email.com',
          to: emailDto.email,
          subject: 'Recuperación de contraseña',
          text: `Haga clic en este enlace para restablecer su contraseña: ${resetLink}`,
        };
    
        try {
          await this.transporter.sendMail(mailOptions);
        } catch (error) {
          throw new Error(`Error al enviar el correo: ${error}`);
        }
      }

}
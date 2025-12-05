const nodemailer = require('nodemailer');
const logger = require('./logger');

class MailService {
    transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT === '465',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }

    async sendInfoMail(to) {
        const html = `
            <body>
                <h1>Info</h1>
                <h2>Last news</h2>
                <ul>
                    <li>Create login auth</li>
                    <li>Create session auth</li>
                    <li>Create cron tasks</li>
                </ul>
            </body>
        `;


        const info = await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Info',
            html: html
        });

        logger.info(`Message sent, id: ${info.messageId}`);
    }
}


module.exports = new MailService();
import nodemailer from 'nodemailer';
import config from '../config/mailer';

const transport = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: config.MAILGUN_USER,
        pass: config.MAILGUN_PASS
    },
    tls: {
        rejectUnauthorised: false
    }
});

module.exports = {
    sendEmail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({ from, to, subject, html }, (err, info) => {
                if (err) reject(err);

                resolve(info);
            });
        });
    }
}
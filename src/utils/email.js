import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    console.log(options);
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // 2) Define the email options
    const mailOptions = {
        from: 'Jonas Schmedtmann <hello@jonas.io>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

export default sendEmail;

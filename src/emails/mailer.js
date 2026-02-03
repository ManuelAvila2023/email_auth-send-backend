import { createTransport } from 'nodemailer';
import { env } from '../config/env.js';

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: env.GOOGLE_APP_EMAIL,
    pass: env.GOOGLE_APP_PASSWORD
  },
});

// Send an email using async/await
export const sendEmail = async (options) => {
  const mailOptions = {
    from: `"Luis Avila" <${env.GOOGLE_APP_EMAIL}>`,
    ...options,
  };

  await transporter.sendMail(mailOptions);
};

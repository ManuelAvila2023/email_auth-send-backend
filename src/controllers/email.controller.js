import { sendEmail } from '../emails/mailer.js';
import { catchError } from '../middlewares/catchError.js';

export const contactEmail = catchError(async (req, res) => {
  const { name, email, phone, message } = req.body;

  await sendEmail({
    to: email,
    subject: 'Hola, hemos recibido tu mensaje',
    html: `
      <div style="padding:20px; background-color:#c2e9f9; font-family:Arial, sans-serif;">
        <h1>Gracias por contactarnos, ${name}!</h1>
        <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>

        <h2>Resumen de tu mensaje:</h2>
        <ul>
          <li><strong>Nombre:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Teléfono:</strong> ${phone}</li>
          <li><strong>Mensaje:</strong> ${message}</li>
        </ul>
      </div>
    `,
  });

  return res.json({ message: 'Email sent successfully' });
});

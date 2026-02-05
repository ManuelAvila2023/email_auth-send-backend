import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'node:crypto';
import { sendEmail } from '../emails/mailer.js';
import { catchError } from '../middlewares/catchError.js';
import User from '../models/user.model.js';
import EmailCode from '../models/email_code.model.js';
import { env } from '../config/env.js';

export const getAll = catchError(async (req, res) => {
  const results = await User.findAll();
  return res.json(results);
});

export const create = catchError(async (req, res) => {
  const { email, password, frontBaseUrl, ...restData } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) return res.status(409).json({ message: 'Email already in use' });
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    email, password: hashedPassword, ...restData

  });
if (env.ENV !== 'production') {
  await sendEmail({
    to: email,
    subject: 'Hello, welcome to our platform',
    html: `
    <div style="padding:20px; background-color:#c2e9f9; font-family:Arial, sans-serif;">
      <h1>Hello ${result.firstName} ${result.lastName}, thank you for joining us!</h1>
      <p>We’re excited to have you on our platform. If you have any questions, please don’t hesitate to contact us.</p>
      <h2>Your account details:</h2>
      <ul>
        <li><strong>Email</strong>: ${email}</li>
      </ul>
      <p>We hope you enjoy our services!</p>
    </div>
  `,
  });

  const code = randomBytes(25).toString('hex');

  const link = `${frontBaseUrl}/${code}`; // http://yourdomain/verify-email/token

  await EmailCode.create({ code, userId: result.id });

  await sendEmail({
    to: email,
    subject: 'Verify your email address',
    html: `
    <div style="padding:20px; background-color:#c2e9f9; font-family:Arial, sans-serif;">
      <h1>Hello ${result.firstName} ${result.lastName}, please verify your email address</h1>
      <p>
        To complete the verification process, please click the following link:
      </p>
      <a href="${link}" style="display:inline-block; padding:10px 15px; background-color:#007bff; color:#ffffff; text-decoration:none; border-radius:5px;">
        Verify Email Address
      </a>
      <p>
        If you did not request this verification, you may ignore this email.
      </p>
      <p>
        Thank you for joining us!
      </p>
    </div>
  `,
  });
}  
  return res.status(201).json(result);
});

export const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await User.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

export const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  return res.sendStatus(204);
});

export const update = catchError(async (req, res) => {
  const { id } = req.params;
  const { password, ...restData } = req.body;
  const result = await User.update(
    restData,
    { where: { id }, returning: true }
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

export const login = catchError(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });
  if (!user.isVerified) return res.status(401).json({ message: 'Please verify your email before logging in' });
  const token = jwt.sign({ user }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
  return res.json({ token, user });
});

export const verifyEmail = catchError(async (req, res) => {
  const { code } = req.params;
  const emailCode = await EmailCode.findOne({ where: { code } });
  if (!emailCode) return res.status(401).json({ message: 'Invalid verification code' });

  const user = await User.update({ isVerified: true }, { where: { id: emailCode.userId }, returning: true }
  );
  await emailCode.destroy();
  return res.json({
    message: 'Email verified successfully', user: user[1][0],
  });
}); // verify/:code

export const userLogged = catchError(async (req, res) => {
  const { user } = req;
  return res.json(user);
});

export const resetPassword = catchError(async (req, res) => {
  const { email, frontBaseUrl } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'User not found' });

  if (env.ENV !== 'production') {
    const code = randomBytes(32).toString('hex');
    const link = `${frontBaseUrl}/${code}`;
  
    await EmailCode.create({ code, userId: user.id });
  
    await sendEmail({
      to: email,
      subject: 'Reset your password',
      html: `
      <div style="padding:20px; background-color:#f8d7da; font-family:Arial, sans-serif;">
        <h1>Hello ${user.firstName} ${user.lastName}, reset your password</h1>
        <p>
          You have requested to reset your password. Click the following link to reset it:
        </p>
        <a href="${link}" style="display:inline-block; padding:10px 15px; background-color:#dc3545; color:#ffffff; text-decoration:none; border-radius:5px;">
          Reset Password
        </a>
        <p>
          If you did not request this password reset, you may ignore this email.
        </p>
        <p>
          This link will expire soon for security reasons.
        </p>
      </div>
    `,
    });    
  }

  return res.json({ message: 'Password reset email sent successfully' });
});

export const resetPasswordWithCode = catchError(async (req, res) => {
  const { code } = req.params;
  const { password } = req.body;

  const emailCode = await EmailCode.findOne({ where: { code } });
  if (!emailCode) return res.status(401).json({ message: 'Invalid reset code' });

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.update(
    { password: hashedPassword },
    { where: { id: emailCode.userId } }
  );

  await emailCode.destroy();

  return res.json({ message: 'Password reset successfully' });
});
import { Router } from 'express';
import { contactEmail } from '../controllers/email.controller.js';
import userRouter from './user.route.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API' });
});

router.post('/api/emails/contact', contactEmail);

router.use('/api', userRouter);



export default router;
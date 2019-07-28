import { Router } from 'express';
import User from '../controller/user';

const router = Router();

router.post('/api/v1/signup', User.signup);
router.post('/api/v1/signin', User.signin);

export default router;
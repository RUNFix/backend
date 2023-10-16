import { Request, Response, Router } from 'express';
import {
  registerCtrl,
  loginCtrl,
  refreshCtrl,
  updatePassCtrl,
} from '../controllers/auth';

const router = Router();

/*http://localhost:4000/auth/login [POST] */
router.post('/register', registerCtrl);
router.post('/login', loginCtrl);
router.post('/refresh', refreshCtrl);
router.put('/update/:id', updatePassCtrl);

export { router };

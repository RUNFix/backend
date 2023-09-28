import { Request, Response, Router, RequestHandler } from 'express';
import {
  getEmployee,
  getEmployees,
  updateEmployee,
  postEmployee,
  deleteEmployee,
} from '../controllers/employee';
import { logMiddleware } from '../middleware/log';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getEmployees);
router.get('/:id', authMiddleware, getEmployee);
router.post('/', postEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export { router };

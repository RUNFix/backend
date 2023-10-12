import { Request, Response, Router, RequestHandler } from 'express';
import {
  getEmployee,
  getEmployees,
  updateEmployee,
  postEmployee,
  deleteEmployee,
} from '../controllers/employee';
import { logMiddleware } from '../middleware/log';
import { adminAuthorize, authMiddleware, refreshAuthMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware,adminAuthorize, getEmployees);
// router.get('/refresh-token', refreshAuthMiddleware, getEmployees);
router.get('/:id', authMiddleware, getEmployee);
router.post('/', authMiddleware,postEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export { router };

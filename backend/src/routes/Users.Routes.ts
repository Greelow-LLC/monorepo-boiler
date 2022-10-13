import {
  deleteUser,
  getUserById,
  getUsers,
  registerUser,
  loginUser,
  updateUser,
} from 'controllers/Users.Controller';
import { Users } from 'entities/Users';
import { Router } from 'express';
import { validateId, validateSchema } from 'middlewares';
import { loginUserSchema, registerUserSchema, updateUserSchema } from 'schemas';
import { safe } from 'utils/helpers';

export const router = Router();

router.get('/', safe(getUsers));

router.get('/:id', validateId(Users), safe(getUserById));

router.post(
  '/register',
  validateSchema(registerUserSchema),
  safe(registerUser),
);
router.post('/login', validateSchema(loginUserSchema), safe(loginUser));

router.put(
  '/:id',
  validateId(Users),
  validateSchema(updateUserSchema),
  safe(updateUser),
);

router.delete('/:id', validateId(Users), safe(deleteUser));

export default router;

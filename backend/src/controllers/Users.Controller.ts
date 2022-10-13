import { Users } from 'entities/Users';
import { Request, Response } from 'express';
import {
  deleteOneUser,
  getAllUsers,
  getOneUser,
  registerOneUser,
  loginOneUser,
  updateOneUser,
} from 'services/Users.Services';

export const getUsers = async (_: any, res: Response): Promise<Response> =>
  res.json(await getAllUsers());

export const registerUser = async (
  req: Request<unknown, unknown, Users>,
  res: Response,
): Promise<Response> => res.json(await registerOneUser(req.body));

export const loginUser = async (
  req: Request<unknown, unknown, Users>,
  res: Response,
): Promise<Response> => res.json(await loginOneUser(req.body));

export const updateUser = async (
  req: Request<unknown, unknown, Users>,
  res: Response,
): Promise<Response> =>
  res.json(await updateOneUser(res.locals.item, req.body));

export const getUserById = async (_: any, res: Response): Promise<Response> =>
  res.json(await getOneUser(res.locals.item));

export const deleteUser = async (_: any, res: Response): Promise<Response> =>
  res.json(await deleteOneUser(res.locals.item));

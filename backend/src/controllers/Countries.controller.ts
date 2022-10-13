import { Countries } from 'entities/Countries';
import { Request, Response } from 'express';
import {
  createOneCountry,
  deleteOneCountry,
  getAllCountries,
  getOneCountry,
  updateOneCountry,
} from 'services/Countries.services';

export const getCountries = async (_: any, res: Response): Promise<Response> =>
  res.json(await getAllCountries());

export const createCountries = async (
  req: Request<unknown, unknown, Countries>,
  res: Response,
): Promise<Response> => res.json(await createOneCountry(req.body));

export const updateCountries = async (
  req: Request<unknown, unknown, Countries>,
  res: Response,
): Promise<Response> =>
  res.json(await updateOneCountry(res.locals.item, req.body));

export const getCountry = async (_: any, res: Response): Promise<Response> =>
  res.json(await getOneCountry(res.locals.item));

export const deleteCountries = async (
  _: any,
  res: Response,
): Promise<Response> => res.json(await deleteOneCountry(res.locals.item));

import {
  getCountries,
  getCountry,
  updateCountries,
  createCountries,
  deleteCountries,
} from 'controllers/Countries.controller';
import { Countries } from 'entities/Countries';
import { Router } from 'express';
import { validateId, validateSchema } from 'middlewares';
import { countrySchema } from 'schemas';
import { safe } from 'utils/helpers';

export const router = Router();

router.get('/', safe(getCountries));

router.get('/:id', validateId(Countries), safe(getCountry));

router.post('/create', validateSchema(countrySchema), safe(createCountries));

router.put(
  '/update/:id',
  validateId(Countries),
  validateSchema(countrySchema),
  safe(updateCountries),
);

router.delete('/delete/:id', validateId(Countries), safe(deleteCountries));

export default router;

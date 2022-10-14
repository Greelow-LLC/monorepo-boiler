import { z } from 'zod';

export const countrySchema = z.object({
  descri: z
    .string({
      invalid_type_error: 'Description should be a string',
      required_error: 'Description is required',
    })
    .min(1, "Description can't be empty"),
});

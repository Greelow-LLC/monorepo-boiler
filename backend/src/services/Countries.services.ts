import { Countries } from 'entities/Countries';
import { createOne, deleteOne, findAll, findOne, updateOne } from 'services';
import { customError } from 'utils/helpers';

export const getAllCountries = async () => await findAll(Countries);

export const createOneCountry = async ({ descri }: Countries) => {
  const countryExists = await findOne(Countries, {
    where: { descri },
  });

  if (countryExists)
    throw await customError('Country already exists with this description', 1);

  const newCountry = (await createOne(Countries, { descri })) as Countries;
  return await findOne(Countries, { where: { id: newCountry?.id } });
};

export const updateOneCountry = async (
  countryToUpdate: Countries,
  updateData: Countries,
) => {
  const countryExists = await findOne(Countries, {
    where: { descri: updateData?.descri },
  });

  if (countryExists && countryToUpdate.id !== countryExists.id)
    throw await customError('Country already exists with this description', 1);

  await updateOne(Countries, countryToUpdate, updateData);

  return await findOne(Countries, { where: { id: countryToUpdate.id } });
};

export const getOneCountry = async (country: Countries) =>
  await findOne(Countries, { where: { id: country.id } });

export const deleteOneCountry = async (userToDelete: Countries) =>
  await deleteOne(Countries, userToDelete);

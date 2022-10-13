import { Users } from 'entities/Users';
import { createOne, deleteOne, findAll, findOne, updateOne } from 'services';
import { createJwt, cryptPass } from 'utils/auth';
import { comparePass } from 'utils/auth';
import { customError } from 'utils/helpers';

export const getAllUsers = async () => await findAll(Users);

export const registerOneUser = async ({
  email,
  firstName,
  lastName,
  password,
  phone,
}: Users) => {
  const userExists = await findOne(Users, { where: { email } });
  if (userExists) throw await customError('User already exists', 1);

  const hashedPassword = cryptPass(password);

  const user = (await createOne(Users, {
    email,
    firstName,
    lastName,
    password: hashedPassword,
    phone,
  })) as Users;
  const token = (await createJwt(user)) as string;

  return { user, token };
};

export const loginOneUser = async ({ email, password }: Users) => {
  const userExists = await findOne(Users, { where: { email } });
  if (!userExists) throw await customError('User not exists', 2);

  console.log(userExists.password);

  const passwordMatch = comparePass(password, userExists.password);

  if (!passwordMatch) throw await customError('Wrong user data', 3);

  const token = (await createJwt(userExists)) as string;

  return { token };
};

export const updateOneUser = async (userToUpdate: Users, updateData: Users) => {
  const userExists = await findOne(Users, {
    where: { email: updateData.email },
  });
  if (userExists && userToUpdate.id !== userExists.id)
    throw await customError('User already exists', 1);

  await updateOne(Users, userToUpdate, updateData);
  const updatedUser = await findOne(Users, { where: { id: userToUpdate.id } });
  const token = await createJwt(updateData);

  return { updatedUser, token };
};

export const getOneUser = async (user: Users) =>
  await findOne(Users, { where: { id: user.id } });

export const deleteOneUser = async (userToDelete: Users) =>
  await deleteOne(Users, userToDelete);

'use server';

import prisma from '../../../prisma/client';
import { NewUserT } from '@/types/NewUserT';

const getAllUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  } catch (error) {
    console.error(`------> Prisma GetAllUsers Error: `, error);
    throw error;
  }
};

const checkAndAddUser = async (thisUserData: NewUserT) => {
  const { email, name, avatarURL } = thisUserData;
  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!userExists) {
    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        avatarURL: avatarURL,
      },
    });
    return newUser;
  } else {
    console.log(`------> User with email ${email} already exists.`);
    return userExists;
  }
};

export { getAllUsers, checkAndAddUser };

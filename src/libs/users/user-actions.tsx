'use server';

import { UserT } from '@/types/UserT';
import prisma from '../../../prisma/client';

const getAllUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  } catch (error) {
    console.error('------> Prisma GetAllUsers Error: ', error);
    throw error;
  }
};

const addNewUser = async (newUser: {
  email: string;
  name: string;
  avatarURL: string;
}) => {
  try {
    const user = await prisma.user.create({
      data: newUser,
    });
    return user;
  } catch (error) {
    console.error('------> Prisma AddNewUser Error: ', error);
    throw error;
  }
};

export { getAllUsers, addNewUser };

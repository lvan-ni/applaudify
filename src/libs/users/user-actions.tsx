'use server';

import { UserT } from '@/types/UserT';
import prisma from '../../../prisma/client';

const getAllUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  } catch (error) {
    console.log('------> Prisma GetAllUsers Error: ', error);
  }
};

const addNewUser = async (newUser) => {
  try {
    const user = await prisma.user.create({
      data: newUser,
    });
    return user;
  } catch (error) {
    console.log('------> Prisma AddNewUser Error: ', error);
  }
};

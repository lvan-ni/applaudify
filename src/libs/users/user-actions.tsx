'use server';

import prisma from '../../../prisma/client';
import { NewUserT } from '@/types/NewUserT';
import { NewProfileInfoT } from '@/types/newProfileInfoT';

const getAllUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  } catch (error) {
    console.error(`------> Prisma getAllUsers Error: `, error);
    throw error;
  }
};

const checkAndAddUser = async (thisUserData: NewUserT) => {
  try {
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
  } catch (error) {
    console.error(`------> Prisma checkAndAddUser Error: `, error);
    throw error;
  }
};

const updateUserProfile = async (
  newProfileInfo: NewProfileInfoT,
  userId: string
) => {
  try {
    const toUpdate = await prisma.user.update({
      where: {
        userId: userId,
      },
      data: newProfileInfo,
    });
    return toUpdate;
  } catch (error) {
    console.error(`------> Prisma updateUserProfile Error: `, error);
    throw error;
  }
};

export { getAllUsers, checkAndAddUser, updateUserProfile };

'use server';

import prisma from '../../../prisma/client';

const getAllApplauds = async () => {
  try {
    const allApplauds = await prisma.applaud.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
    return allApplauds;
  } catch (error) {
    console.log('------> Prisma GetAllApplauds Error: ', error);
  }
};

export default getAllApplauds;

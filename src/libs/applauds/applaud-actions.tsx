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
    console.error(`------> Prisma GetAllApplauds Error: `, error);
    throw error;
  }
};

const getUnreadApplauds = async (userEmail: string) => {
  try {
    const unreadApplauds = await prisma.applaud.findMany({
      where: {
        receiver: { email: userEmail },
        isRead: false,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
    return unreadApplauds;
  } catch (error) {
    console.error(`------> Prisma GetUnreadApplauds Error: `, error);
  }
};

const getPublishedApplauds = async (userEmail: string) => {
  try {
    const publishedApplauds = await prisma.applaud.findMany({
      where: {
        receiver: { email: userEmail },
        isPublished: true,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
    return publishedApplauds;
  } catch (error) {
    console.error(`------> Prisma GetPublishedApplauds Error: `, error);
  }
};

export { getAllApplauds, getUnreadApplauds, getPublishedApplauds };

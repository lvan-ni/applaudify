'use server';

import { NewApplaudT } from '@/types/NewApplaudT';
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
    console.error(`------> Prisma getAllApplauds Error: `, error);
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
    console.error(`------> Prisma getUnreadApplauds Error: `, error);
    throw error;
  }
};

const setApplaudToRead = async (applaudId: string) => {
  try {
    const updateApplaud = await prisma.applaud.update({
      where: {
        applaudId: applaudId,
      },
      data: {
        isRead: true,
      },
    });
    return updateApplaud;
  } catch (error) {
    console.error(`------> Prisma setApplaudToRead Error: `, error);
    throw error;
  }
};

const publishApplaud = async (applaudId: string) => {
  try {
    const published = await prisma.applaud.update({
      where: {
        applaudId: applaudId,
      },
      data: {
        isPublished: true,
      },
    });
    return published;
  } catch (error) {
    console.error(`------> Prisma publishApplaud Error: `, error);
    throw error;
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
    console.error(`------> Prisma getPublishedApplauds Error: `, error);
    throw error;
  }
};

const unpublishApplaud = async (applaudId: string) => {
  try {
    const unpublish = await prisma.applaud.update({
      where: {
        applaudId: applaudId,
      },
      data: {
        isPublished: false,
      },
    });
    return unpublish;
  } catch (error) {
    console.error(`------> Prisma unPublishApplaud Error: `, error);
    throw error;
  }
};

const sendNewApplaud = async (newApplaud: NewApplaudT) => {
  try {
    const send = await prisma.applaud.create({
      data: newApplaud,
    });
    return send;
  } catch (error) {
    console.error(`------> Prisma sendNewApplaud Error: `, error);
    throw error;
  }
};

export {
  getAllApplauds,
  getUnreadApplauds,
  setApplaudToRead,
  publishApplaud,
  getPublishedApplauds,
  unpublishApplaud,
  sendNewApplaud,
};

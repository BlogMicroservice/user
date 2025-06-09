import { Request, Response } from 'express';
import { errorHandler } from '../utils/ErrorHandler';
import prisma from '../config/prismaClient';

export const getProfile = errorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: false,
      message: 'ID is required',
    });
  }

  const user = await prisma.profile.findFirst({
    where: { id },
    select: {
      userName: true,
      profileImage: true,
      bio: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'Profile not found',
    });
  }

  return res.status(200).json({
    status: true,
    message: 'Profile fetched successfully',
    data: user,
  });
});

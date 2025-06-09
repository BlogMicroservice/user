import { Request, Response } from 'express';
import prisma from '../config/prismaClient';
import { errorHandler } from '../utils/ErrorHandler';

export const createProfile = errorHandler(
  async (req: Request, res: Response) => {
    const { profileId, email, username, profileImage } = req.body;
    console.log(profileId, email, username, profileImage)
    const newProfile = await prisma.profile.create({
      data: {
        id: profileId,
        email,
        userName: username,
        profileImage,
      },
    });
    return res.status(201).json({
      status: true,
      message: 'Profile created successfully',
    });
  },
);

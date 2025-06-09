import { Request, Response } from 'express';
import prisma from '../config/prismaClient';
import { suggestUniqueUsernames } from '../utils/suggestUserName';
import { errorHandler } from '../utils/ErrorHandler';

export const CheckUserName = errorHandler(
  async (req: Request, res: Response) => {
    const user_name = String(req.query.user_name || '').trim();

    if (!user_name) {
      return res.status(400).json({
        status: false,
        message: 'user_name query parameter is required',
      });
    }

    const existingUser = await prisma.profile.findFirst({
      where: { userName: user_name },
    });

    if (existingUser) {
      const suggestions = await suggestUniqueUsernames(user_name);
      return res.status(200).json({
        status: false,
        message: 'Username already exists',
        data: { suggestions },
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Username is available',
    });
  }
);

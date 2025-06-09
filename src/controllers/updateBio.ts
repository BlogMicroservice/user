import { Request, Response } from "express";
import { errorHandler } from "../utils/ErrorHandler";
import prisma from "../config/prismaClient";

export const UpdateBio = errorHandler(async (req: Request, res: Response) => {
    const { userName, bio } = req.body;

    if (!userName || !bio) {
        return res.json({ status: false, message: "Username or bio is required" });
    }

    const updateProfile = await prisma.profile.update({
        where: { userName: userName },
        data: { bio: bio },
    });

    return res.json({ status: true, message: "Bio updated successfully", data: updateProfile });
});

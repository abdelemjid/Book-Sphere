import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const validateToken = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const adminToken = req.cookies["admin_auth_token"];
    const userToken = req.cookies["user_auth_token"];

    if (!adminToken && !userToken) return res.status(301).json({ message: "Unauthenticated" });

    if (adminToken) {
      const decoded = jwt.verify(adminToken, process.env.ADMIN_JWT_KEY as string);
      const adminId = (decoded as JwtPayload).adminId;

      if (adminId) return res.status(200).json({ message: "Authenticated", admin: true });
      else return res.status(301).json({ message: "Unauthenticated" });
    } else {
      const decoded = jwt.verify(userToken, process.env.USER_JWT_KEY as string);
      const userId = (decoded as JwtPayload).userId;

      if (userId) return res.status(200).json({ message: "Authenticated", admin: false });
      else return res.status(301).json({ message: "Unauthenticated" });
    }
  } catch (error) {
    return res.status(301).json({ message: "Unauthenticated" });
  }
};

import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { validationResult } from "express-validator";
import { AdminModel } from "../models/AdminModel";

/**
 * adminRegister - @async Function that register admins and generates admin token
 *
 * @param req Express request
 * @param res Express response
 * @returns Promise contains Express response of admin registration
 */
const adminRegister = async (req: Request, res: Response): Promise<Response | void> => {
  // verify if there's request errors
  const errors = validationResult(req).array();
  if (errors?.length > 0) return res.status(400).json({ message: errors[0].msg });

  try {
    const { username, email, phoneNumber, password } = req.body;

    let admin = await AdminModel.findOne({ email });
    if (admin) return res.status(400).json({ message: "Admin already exists!" });

    const hashed = await bcrypt.hash(password, 10);
    const joinDate = new Date();
    admin = new AdminModel({ username, email, joinDate, phoneNumber, password: hashed });
    await admin.save();

    const token = jwt.sign({ adminId: admin._id }, process.env.ADMIN_JWT_KEY as string, {
      expiresIn: "1d",
    });

    res.cookie("admin_auth_token", token, {
      httpOnly: true,
      secure: process.env.ENV_MODE === "production",
      maxAge: 60 * 1000 * 60 * 24,
    });

    return res.status(200).json({ message: "Admin registered successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

/**
 * adminLogin - @async Function for Admin Log-in.
 *
 * @param req Express request for admin login with email and password
 * @param res Express response
 * @returns Promise contains Express response or void
 */
const adminLogin = async (req: Request, res: Response): Promise<Response | void> => {
  // verify if there's some errors on request validation
  const errors = validationResult(req).array();
  if (errors?.length) return res.status(400).json({ message: errors[0].msg });

  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalide credentials!" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: "Invalide credentials!" });

    const token = jwt.sign({ adminId: admin._id }, process.env.ADMIN_JWT_KEY as string, {
      expiresIn: "1d",
    });

    res.cookie("admin_auth_token", token, {
      httpOnly: true,
      maxAge: 60 * 1000 * 60 * 24,
      secure: process.env.ENV_MODE === "production",
    });

    return res.status(200).json({ message: "Logged-in successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export { adminRegister, adminLogin };

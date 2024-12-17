import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { UserModel } from "../models/UserModel";
import { env } from "process";
import { BookModel } from "../models/BookModel";

/**
 * userRegister - @async Function that creates new user if not exists and generates
 *                an access token.
 *
 * @param req Express request
 * @param res Express response
 * @returns Promise contains Express response or void
 */
const userRegister = async (req: Request, res: Response): Promise<Response | void> => {
  // verify if there's errors in request validation
  const errors = validationResult(req).array();
  if (errors?.length > 0) return res.status(400).json({ message: errors[0].msg });

  try {
    const { username, email, password } = req.body;

    const registred = await UserModel.findOne({ email });
    if (registred) return res.status(400).json({ message: "User already exists!" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new UserModel({ username: username, email: email, password: hashed });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.USER_JWT_KEY as string, {
      expiresIn: "1d",
    });
    res.cookie("user_auth_token", token, {
      httpOnly: true,
      secure: process.env.ENV_MODE === "production",
      maxAge: 60 * 60 * 1000 * 24,
    });

    res.status(200).json({ message: "Registered successfully." });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please fill a valid info and try to register again",
    });
  }
};

/**
 * userLogin - @async Function that logs in users after the successed
 *             authentication verification
 *
 * @param req Express request
 * @param res Express response
 *
 * @returns Promise contains Express response or void.
 */
const userLogin = async (req: Request, res: Response): Promise<Response | void> => {
  // verify if there's request errors
  const errors = validationResult(req).array();
  if (errors?.length > 0) return res.status(400).json({ message: errors[0].msg });

  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Error: Invalide credentials!" });

    const token = jwt.sign({ userId: user._id }, process.env.USER_JWT_KEY as string, {
      expiresIn: "1d",
    });

    res.cookie("user_auth_token", token, {
      httpOnly: true,
      secure: process.env.ENV_MODE === "production",
      maxAge: 60 * 1000 * 60 * 24,
    });

    return res.status(200).json({ message: "Logged-in successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

/**
 * userLogout - @async Function that logs the user out
 *
 * @param req Express request for user loging out
 * @param res Express response
 * @returns Express Response or void
 */
const userLogout = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const token = jwt.sign({}, process.env.USER_JWT_KEY as string, { expiresIn: "0d" });

    res.cookie("user_auth_token", token, {
      expires: new Date("01/01/1990"),
      httpOnly: true,
      secure: process.env.ENV_MODE === "production",
    });

    return res.status(200).json({ message: "Logged Out Success" });
  } catch (error) {
    return res.status(500).json({ message: "Unknown error occured during the logout process!" });
  }
};

const userBooks = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const books = await BookModel.find({});
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "An error occured during fetching books!" });
  }
};

export { userRegister, userLogin, userLogout, userBooks };

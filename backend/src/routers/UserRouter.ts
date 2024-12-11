import express from "express";
import * as userController from "../controllers/UserController";
import { body } from "express-validator";
import verifyUserToken from "../middleware/UserAuth";

const router = express.Router();

router.post(
  "/register",
  [
    body("username")
      .isString()
      .withMessage("Username invalid!")
      .isLength({ min: 3 })
      .withMessage("Username invalid!"),
    body("email").isEmail().withMessage("Email not valid!"),
    body("password")
      .notEmpty()
      .withMessage("Password invalid!")
      .isLength({ min: 8 })
      .withMessage("Password is require 8 characters or more!"),
  ],
  userController.userRegister as express.RequestHandler
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email address not valid!"),
    body("password").isLength({ min: 8 }).withMessage("Password required!"),
  ],
  userController.userLogin as express.RequestHandler
);

export default router;

import express from "express";
import * as controller from "../controllers/AdminController";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username invalid!")
      .isString()
      .withMessage("Username invalid!"),
    body("email").isEmail().withMessage("Email address invalid!"),
    body("phoneNumber").isMobilePhone("any").withMessage("Mobile phone number invalid!"),
    body("password").isLength({ min: 8 }).withMessage("Password invalid!"),
  ],
  controller.adminRegister as express.RequestHandler
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email address!"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Invalide Password! should contains 8 characters or more"),
  ],
  controller.adminLogin as express.RequestHandler
);

router.post("/new-book");
router.post("/book/:bookId");
router.get("/books");
router.get("/book/:bookId");

export default router;
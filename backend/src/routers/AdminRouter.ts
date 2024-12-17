import express from "express";
import * as controller from "../controllers/AdminController";
import { body } from "express-validator";
import multer from "multer";
import verifyAdminToken from "../middleware/AdminAuth";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username invalid!")
      .isString()
      .withMessage("Username invalid!"),
    body("email").isEmail().withMessage("Email address invalid!"),
    body("phoneNumber")
      .isNumeric({ no_symbols: true })
      .isLength({ min: 7 })
      .withMessage("Mobile phone number invalid!"),
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

router.get("/logout", controller.adminLogout as express.RequestHandler);

router.get(
  "/books",
  verifyAdminToken as express.RequestHandler,
  controller.adminBooks as express.RequestHandler
);

router.post(
  "/add-book",
  verifyAdminToken as express.RequestHandler,
  upload.single("bookCover"),
  [
    body("title").notEmpty().withMessage("Book Title is required"),
    body("author").notEmpty().withMessage("Author Name is required"),
    body("publisher").notEmpty().withMessage("Publisher Name is required"),
    body("language").notEmpty().withMessage("Book Language is required"),
    body("genres")
      .isArray()
      .withMessage("Genres must be an array")
      .isLength({ min: 1 })
      .withMessage("A book must have at least one genre")
      .withMessage("Book Genre is required"),
    body("publicationDate").isDate().notEmpty().withMessage("Publication Date is required"),
    body("pages").isNumeric().notEmpty().withMessage("Book Page Count is required"),
    body("isbn")
      .isNumeric()
      .isLength({ min: 10 })
      .withMessage("Book ISBN not valid")
      .notEmpty()
      .withMessage("Book ISBN is required"),
    body("price").isNumeric().notEmpty().withMessage("Book Price count is required"),
    body("stockQuantity").isNumeric().notEmpty().withMessage("Stock Quantity is required"),
  ],
  controller.addBook as express.RequestHandler
);

router.post("/book/:bookId");
router.get("/book/:bookId");

export default router;

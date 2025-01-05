import express from "express";
import verifyUserToken from "../middleware/UserAuth";
import * as ordersController from "../controllers/OrderController";
import { body, param } from "express-validator";

const router = express.Router();

router.post(
  "/order",
  verifyUserToken as express.RequestHandler,
  [
    body("bookId")
      .notEmpty()
      .withMessage("Book ID is required to order it")
      .isString()
      .withMessage("Invalide Book ID")
      .isLength({ min: 24 })
      .withMessage("Invalide Book ID"),
    body("quantity")
      .notEmpty()
      .withMessage("Quantity is required to order the book")
      .isNumeric({ no_symbols: true })
      .withMessage("Quantity number not valid"),
  ],
  ordersController.orderBook as express.RequestHandler
);

router.get(
  "/order/:orderId",
  verifyUserToken as express.RequestHandler,
  [
    param("orderId")
      .notEmpty()
      .withMessage("Invalid order ID")
      .isLength({ min: 24 })
      .withMessage("Invalid order ID"),
  ],
  ordersController.getOrder as express.RequestHandler
);

router.get(
  "/orders",
  verifyUserToken as express.RequestHandler,
  ordersController.getOrders as express.RequestHandler
);

router.delete(
  "/order/:orderId",
  verifyUserToken as express.RequestHandler,
  [
    body("orderId")
      .notEmpty()
      .withMessage("Invalid order ID")
      .isLength({ min: 24 })
      .withMessage("Invalid order ID"),
  ],
  ordersController.removeOrder as express.RequestHandler
);

router.patch(
  "/order/quantity",
  verifyUserToken as express.RequestHandler,
  [
    body("quantity").isDecimal().withMessage("Invalid quantity number"),
    body("orderId")
      .isString()
      .withMessage("Invalide order ID")
      .isLength({ min: 24 })
      .withMessage("Invalide order ID"),
  ],
  ordersController.updateQuantity as express.RequestHandler
);

export default router;

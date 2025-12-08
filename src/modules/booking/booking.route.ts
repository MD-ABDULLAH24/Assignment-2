import express from "express";
import { bookingController } from "./booking.controller";
import logger from "../../middlewhere/logger";
import loginAuth from "../../middlewhere/auth";

const router = express.Router();

router.post("/", loginAuth("admin", "customer"), bookingController.bookingCreate);

router.get("/", bookingController.getBooking);

router.get("/:id", bookingController.getSingleBooking);

router.put("/:id", bookingController.updateBooking);

router.delete("/:id", bookingController.deleteBooking);

export const bookingRoute = router;

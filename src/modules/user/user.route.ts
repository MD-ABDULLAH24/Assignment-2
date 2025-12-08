import express, { Request, Response } from "express";
import { userControllers } from "./user.controller";
import logger from "../../middlewhere/logger";
import loginAuth from "../../middlewhere/auth";

const router = express.Router();

router.post("/", userControllers.userCreate);

router.get("/", loginAuth("admin"), userControllers.getUser);

router.get("/:id", loginAuth("admin"), userControllers.getSingleUser);

router.put("/:id", loginAuth("admin"), userControllers.updateUser);

router.delete("/:id", loginAuth("admin"), userControllers.deleteUser)

export const userRoute = router;

import express from "express";
import { vehicleController } from "./vehicle.controller";
import logger from "../../middlewhere/logger";
import loginAuth from "../../middlewhere/auth";

const router = express.Router();

router.post("/", loginAuth("admin"), vehicleController.vehicleCreate);

router.get("/", vehicleController.getVehicle);

router.get("/:id", vehicleController.getSingleVehicle);

router.put("/:id", loginAuth("admin"), vehicleController.updateVehicle);

router.delete("/:id", loginAuth("admin"), vehicleController.deleteVehicle);

export const vehicleRoute = router;

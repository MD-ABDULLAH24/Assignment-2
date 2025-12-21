import initDb, {pool} from "./config/db";
import express, { NextFunction, Request, Response } from "express";
import logger from "./middlewhere/logger";
import { userRoute } from "./modules/user/user.route";
import { vehicleRoute } from "./modules/vehicle/vehicle.route";
import { bookingRoute } from "./modules/booking/booking.route";
import { userAuth } from "./modules/auth/auth.route";

const app = express();
app.use(express.json());

initDb();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1/users", userRoute);

app.use("/api/v1/vehicles", vehicleRoute)

app.use("/api/v1/bookings", bookingRoute)

app.use("/api/v1/auth", userAuth)


export default app
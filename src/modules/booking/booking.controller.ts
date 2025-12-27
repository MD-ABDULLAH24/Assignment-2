import { Request, Response } from "express";
import { bookingServices } from "./booking.services";

// CREATE booking
const bookingCreate = async (req: Request, res: Response) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date, status } = req.body;

  if (!customer_id || !vehicle_id || !rent_start_date || !rent_end_date) {
    return res.status(400).json({ success: false, message: "All required fields must be provided" });
  }

  if (new Date(rent_end_date) <= new Date(rent_start_date)) {
    return res.status(400).json({ success: false, message: "rent_end_date must be after rent_start_date" });
  }

  const allowedStatus = ["active", "cancelled", "returned"];
  if (status && !allowedStatus.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value" });
  }

  try {
    const result = await bookingServices.createBooking(req.body);
    return res.status(result.success ? 201 : 400).json(result);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET all bookings
const getBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getBooking();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET single booking
// const getSingleBooking = async (req: Request, res: Response) => {
//   const id = req.params.id;
//   if (!id) return res.status(400).json({ success: false, message: "Booking ID is required" });

//   try {
//     const result = await bookingServices.getSingleBooking(id);
//     return res.status(result.success ? 200 : 404).json(result);
//   } catch (error: any) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// UPDATE booking
const updateBooking = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ success: false, message: "Booking ID is required" });

  const { customer_id, vehicle_id, rent_start_date, rent_end_date, status } = req.body;
  if (!customer_id || !vehicle_id || !rent_start_date || !rent_end_date) {
    return res.status(400).json({ success: false, message: "All required fields must be provided" });
  }

  const allowedStatus = ["active", "cancelled", "returned"];
  if (status && !allowedStatus.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value" });
  }

  try {
    const result = await bookingServices.updateBooking(id, req.body);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE booking
const deleteBooking = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ success: false, message: "Booking ID is required" });

  try {
    const result = await bookingServices.deleteBooking(id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const bookingController = {
  bookingCreate,
  getBooking,
  // getSingleBooking,
  updateBooking,
  deleteBooking,
};

import { pool } from "../../config/db";

// CREATE booking
const createBooking = async (Payload: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date, status = "active" } = Payload;

  // Check vehicle exists
  const vehicleResult = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );
  if (vehicleResult.rows.length === 0) {
    return { success: false, message: "Vehicle not found", data: null };
  }

  const vehicle = vehicleResult.rows[0];

  // Calculate total_price
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const total_price = vehicle.daily_rent_price * diffDays;

  // Insert booking
  const result = await pool.query(
    `INSERT INTO booking(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]
  );

  return { success: true, message: "Booking created successfully", data: { ...result.rows[0], vehicle } };
};

// GET all bookings
const getBooking = async () => {
  const result = await pool.query(
    `SELECT b.*, v.vehicle_name, v.daily_rent_price 
     FROM booking b 
     JOIN vehicles v ON b.vehicle_id=v.id`
  );
  return { success: true, message: "Bookings retrieved successfully", data: result.rows };
};

// GET single booking
const getSingleBooking = async (id: string) => {
  const result = await pool.query(
    `SELECT b.*, v.vehicle_name, v.daily_rent_price 
     FROM booking b 
     JOIN vehicles v ON b.vehicle_id=v.id 
     WHERE b.id=$1`,
    [id]
  );
  if (result.rows.length === 0) return { success: false, message: "Booking not found", data: null };
  return { success: true, message: "Booking retrieved successfully", data: result.rows[0] };
};

// UPDATE booking
const updateBooking = async (id: string, Payload: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date, status = "active" } = Payload;

  // Check vehicle exists
  const vehicleResult = await pool.query(
    `SELECT daily_rent_price FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );
  if (vehicleResult.rows.length === 0) {
    return { success: false, message: "Vehicle not found", data: null };
  }
  const vehicle = vehicleResult.rows[0];

  // Calculate total_price
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const total_price = vehicle.daily_rent_price * diffDays;

  const result = await pool.query(
    `UPDATE booking 
     SET customer_id=$1, vehicle_id=$2, rent_start_date=$3, rent_end_date=$4, total_price=$5, status=$6
     WHERE id=$7 RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status, id]
  );

  if (result.rows.length === 0) return { success: false, message: "Booking not found", data: null };

  return { success: true, message: "Booking updated successfully", data: { ...result.rows[0], vehicle } };
};

// DELETE booking
const deleteBooking = async (id: string) => {
  const result = await pool.query(`DELETE FROM booking WHERE id = $1 RETURNING *`, [id]);
  if (result.rows.length === 0) return { success: false, message: "Booking not found", data: null };
  return { success: true, message: "Booking deleted successfully", data: null };
};

export const bookingServices = {
  createBooking,
  getBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};

import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.services";
import { pool } from "../../config/db";

const vehicleCreate = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;

  try {
    const result = await vehicleServices.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Data insert successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM vehicles`);
    res.status(201).json({
      success: true,
      message: "Data retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getSingleVehicle(req.params.id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle Fethed successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;
  try {
    const result = await vehicleServices.updateVehicle(
          vehicle_name,
          type,
          registration_number,
          daily_rent_price,
          availability_status,
          req.params.id as string
        );
        if (result.rows.length === 0) {
          res.status(404).json({
            success: false,
            message: "user not found",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "user update successfully",
            data: result.rows[0],
          });
        }
  } catch (error:any) {
     res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.deleteVehicle(req.params.id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }else{
      res.status(200).json({
        success: true,
        message: "Vehicle Deleted successfully",
        data : result.rows[0]
      })
    }
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehicleController = {
  vehicleCreate,
  getVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle
};

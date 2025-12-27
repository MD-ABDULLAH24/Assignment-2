import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.services";

const userCreate = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const result = await userServices.createUser(req.body);
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

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "Users retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const getSingleUser = async (req: Request, res: Response) => {
//   try {
//     const result = await userServices.getSingleUser(req.params.id as string);
//     if (result.rows.length === 0) {
//       res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "User Fethed successfully",
//         data: result.rows[0],
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const updateUser = async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  try {
    const result = await userServices.updateUser(
      name,
      email,
      phone,
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }else{
      res.status(200).json({
        success: true,
        message: "User Deleted successfully",
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
export const userControllers = {
  userCreate,
  getUser,
  // getSingleUser,
  updateUser,
  deleteUser
};

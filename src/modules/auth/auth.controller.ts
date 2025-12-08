import { Request, Response } from "express";
import { authUserService } from "./auth.services";

const signupController = async (req: Request, res: Response) => {
  try {
    const result = await authUserService.signUpServices(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authUserService.loginUser(email, password);
    res.status(200).json({
      success: false,
      message: "password login",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authUserController = {
  signupController,
  loginUser,
};

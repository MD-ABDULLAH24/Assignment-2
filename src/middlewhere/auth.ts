
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/index";
import { pool } from "../config/db";

const loginAuth = (...roles: string[]) => {

  console.log(roles)
  return async (req: Request, res: Response, Next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(500).json({ message: "You are not allowed" });
      }
      const decorded = jwt.verify(token, config.secret as string) as JwtPayload;

      const user = await pool.query(`
        SELECT * FROM users WHERE email=$1 
        `, [decorded.email]);

        if (user.rows.length = 0) {
        
          Error("user not found")
        }
    

      req.user = decorded ;
      if (roles.length && !roles.includes(decorded.role as string)) {
        return res.status(500).json({
          error :"authentication is not correct!!"
        })
      }
      Next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default loginAuth;

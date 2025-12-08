import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const signUpServices = async (payload: {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string
}) => {
  const { name, email, password, role, phone } = payload;
  const checkUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (checkUser.rows.length > 0) {
    throw new Error("User Already Exists");
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, role, phone)
   VALUES($1, $2, $3, $4, $5)
   RETURNING id, name, email, role, phone`,
    [name, email, hashedPass, role, phone] 
  );
  return result;
};

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1 `, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return false;
  }

  const token = jwt.sign(
    { user: user.name, email: user.email, role: user.role },
    config.secret as string,
    {
      expiresIn: "7d",
    }
  );

  console.log({ token });

  return { token, user };
};

export const authUserService = {
  signUpServices,
  loginUser,
};
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { BadRequestError, UnauthenticatedError } from "../utils/error.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { createJWT } from "../utils/token.js";

export const register = async (req, res) => {
  const { fname, lname, username, password } = req.body;
  const user = await User.create({
    fname,
    lname,
    username,
    password: await hashPassword(password),
  });

  if (!user)
    throw new BadRequestError("There was an Error in Creating an Account!");

  res.status(StatusCodes.OK).json("Successfully Registered an Account");
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) throw new UnauthenticatedError("Wrong Credentials");
  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) throw new UnauthenticatedError("Wrong Password");

  const token = createJWT({ id: user._id });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  res.status(StatusCodes.OK).json("Successfully Logged In");
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  res.status(StatusCodes.OK).json("Logged out!");
};

export const get_current_user = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(StatusCodes.OK).json({ user });
};

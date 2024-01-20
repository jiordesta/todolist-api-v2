import { body, validationResult } from "express-validator";
import { BadRequestError } from "../utils/error.js";
import User from "../models/User.js";
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validate_register_inputs = withValidationErrors([
  body("fname").notEmpty().withMessage("fname is required"),
  body("lname").notEmpty().withMessage("lname is required"),
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) throw new BadRequestError("username already exist");
    }),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validate_login_inputs = withValidationErrors([
  body("username").notEmpty().withMessage("username is required"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validate_create_inputs = withValidationErrors([
  body("description").notEmpty().withMessage("Description is required!"),
  body("title").notEmpty().withMessage("Title is required!"),
]);

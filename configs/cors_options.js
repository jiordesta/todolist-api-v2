import { allowedOrigins } from "./allowed_origins.js";

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS!"));
    }
  },
  credentials: true,
  optionSuccessStatus: true,
};

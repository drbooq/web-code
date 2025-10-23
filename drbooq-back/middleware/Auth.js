// import jwt from "jsonwebtoken";
// import Staff from "../models/Staff.js";

// export const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided or invalid format" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const staff = await Staff.findById(decoded.id).select("-password");
//     if (!staff) {
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }

//     req.user = staff;
//     next();
//   } catch (error) {
//     console.error("Auth Middleware Error:", error.message);
//     res.status(401).json({ message: "Unauthorized - invalid or expired token" });
//   }
// };
import jwt from "jsonwebtoken";
import Staff from "../models/Staff.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided or invalid format" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const staff = await Staff.findById(decoded.id).select("-password");
    if (!staff) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = staff;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ message: "Unauthorized - invalid or expired token" });
  }
};

// (optional alias)
export { verifyToken as protect };

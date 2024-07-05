import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  // CREATE TOKEN
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // SET TOKEN TO COOKIE AND SEND
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Miliseconds format (15days*24hours*60min*60min*1000ms)
    httpOnly: true, // Prevent XSS Attacks (cross-site scripting attacks)
    sameSite: "strict", // Prevent CSRF Attacks (cross-site request forgery attacks)
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;

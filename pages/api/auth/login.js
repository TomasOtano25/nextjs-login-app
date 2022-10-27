import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default function loginHandler(req, res) {
  const { method } = req;

  const { email, password } = req.body;

  switch (method) {
    case "POST":
      // check if email and password are valid
      // if email exists
      // is password is correct

      if (email === "admin@local.local" && password === "admin") {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email: "admin@local.local",
            username: "tom",
          },
          "secret"
        );

        const serialized = serialize("myTokenName", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          // sameSite: "none",
          maxAge: 100 * 60 * 60 * 24 * 30,
          path: "/",
        });

        res.setHeader("Set-Cookie", serialized);

        return res.status(200).json("login succesfully");
      }
      return res.status(401).json({ error: "invalid email or password" });
    default:
      return res.status(400).json("invalid method");
  }
}

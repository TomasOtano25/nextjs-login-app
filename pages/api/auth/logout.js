import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function logoutHandler(req, res) {
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(401).json({ error: "no token" });
  }
  try {
    verify(myTokenName, "secret");

    const serialized = serialize("myTokenName", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      // sameSite: "none",
      maxAge: 0,
      path: "/",
    });
    console.log(serialized);

    res.setHeader("Set-Cookie", serialized);
    res.status(200).json("logout succesfully");
  } catch (error) {
    return res.status(401).json("invalid token");
  }
}

export default function loginHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      return res.status(200).json("login route");
      break;

    default:
      return res.status(400).json("invalid method");
  }
  return res.json("login route");
}

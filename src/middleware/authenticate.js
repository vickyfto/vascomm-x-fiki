const AuthModel = require("../models/authToken");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  // const refreshToken = req.headers.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const isTokenAvailable = await AuthModel.find({
      token,
    });
    if (isTokenAvailable.length === 0) {
      return res.status(404).json({ message: "token tidak di temukan" });
    }
    req.isTokenAvailable = isTokenAvailable;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });

    // try {
    //   const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);
    //   const accessToken = jwt.sign(
    //     { user: decoded.user },
    //     process.env.SECRET_KEY,
    //     {
    //       expiresIn: "5m",
    //     }
    //   );

    // res.status(201).json({ message: "sukses refresh token" });
    // } catch (error) {
    //   return res.status(400).send("Invalid Token.");
    // }
  }
};

module.exports = { authenticate };

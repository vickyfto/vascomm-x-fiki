const jwt = require("jsonwebtoken");
const AuthToken = require("../models/authToken");
const { google } = require("googleapis");
const UserModel = require("../models/user");

const googleAuth = async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CLIENT_CALLBACK
  );

  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
  });
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });

  const userData = await oauth2.userinfo.get();
  const getToken = userData.config.headers.Authorization.split(" ")[1];

  const isUserAlreadyRegister = await UserModel.find({
    name: userData.data.email,
  });

  if (isUserAlreadyRegister.length > 0) {
    const expiresIn = 60 * 60 * 1;
    const payload = {
      name: isUserAlreadyRegister[0].name,
    };

    const token = jwt.sign(payload, "thisShouldBeSecret", {
      expiresIn: expiresIn,
    });

    const saveToken = new AuthToken({
      token: getToken,
    });

    await saveToken.save();
    return res.status(201).json({
      message:
        "please login using token from field data and put it in headers on every request product",
      data: getToken,
    });
  }

  if (userData.data.email || userData.data.name) {
    const newProduct = new UserModel({
      name: userData.data.email,
      permission: "admin",
    });

    const saveToken = new AuthToken({
      token: getToken,
    });

    try {
      await newProduct.save();
      await saveToken.save();
      res.status(201).json({
        message:
          "please login using token from field data and put it in headers on every request product",
        data: getToken,
      });
    } catch (err) {
      res.status(400).json({ message: "error" });
    }
  }
  res.status(500).json({ message: "server error" });
};

const authRedirect = async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CLIENT_CALLBACK
  );
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
  });

  res.redirect(authorizationUrl);
};

const logout = async (req, res) => {
  const { token } = req.query;

  const removeTokenFromDB = await AuthToken.findOneAndDelete({
    token,
  });
  if (removeTokenFromDB) {
    res.status(201).json({ message: "logout success" });
  }
  res.status(404).json({ message: "token not found" });
};

module.exports = {
  googleAuth,
  authRedirect,
  logout,
};

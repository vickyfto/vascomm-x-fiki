const express = require("express");
const { googleAuth, authRedirect, logout } = require("../controllers/auth.js");

const router = express.Router();

// auth
router.get("/google", authRedirect);
router.get("/google/callback", googleAuth);
router.post("/logout", logout);

module.exports = router;

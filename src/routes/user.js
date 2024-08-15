const express = require("express");
const {
  getUsers,
  createUser,
  softDeleteUser,
  updateUser,
} = require("../controllers/user.js");

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.delete("/", softDeleteUser);
router.put("/", updateUser);

module.exports = router;

const express = require("express");
const {
  handleRegisterUser,
  handleLoginUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(handleRegisterUser);
router.route("/login").post(handleLoginUser);


module.exports = router;

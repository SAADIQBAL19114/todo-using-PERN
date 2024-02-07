const express = require("express");
const {
  handleRegisterUser,
  handleLoginUser,
  handleUserInfo,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(handleRegisterUser);
router.route("/login").post(handleLoginUser);
router.route("/myself").get(auth,handleUserInfo);

module.exports = router;

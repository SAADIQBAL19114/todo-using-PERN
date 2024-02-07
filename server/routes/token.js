const express = require("express");
const cron = require("node-cron");

const router = express.Router();

const {
  handleCheckToken,
} = require("../controllers/tokenController");



router.route("/check").get(handleCheckToken);

module.exports = router;

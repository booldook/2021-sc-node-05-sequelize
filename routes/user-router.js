const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const { User } = require("../models");

router.get("/create", async (req, res, next) => {
  try {
    await User.create({
      userid: "booldook",
      passwd: "1234",
      userName: "임덕규",
      email: "booldook@gmail.com",
    });
    res.send("저장되었습니다.");
  } catch (err) {
    next(createError(err));
  }
});

module.exports = router;

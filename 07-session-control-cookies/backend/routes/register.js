const fs = require("fs");
const express = require("express");
const router = express.Router();
router.use(express.json());

// modules
const verifyPassword = require("../modules/verifyPassword");
const createToken = require("../modules/createToken");

// route
router.post("/", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (verifyPassword(username, password)) {
    try {
      const token = createToken(username);
      res.status(200).json({
        token: token,
      });
    } catch (err) {
      console.log("Login success, token not created");
      res.status(500).json({
        error: "Internal server error",
      });
    }
  } else {
    res.status(401).json({
      error: "Invalid username or password",
    });
  }
});

module.exports = router;

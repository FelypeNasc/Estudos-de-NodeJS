const fs = require("fs");
const express = require("express");
const router = express.Router();
router.use(express.json());

// modules
const verifyToken = require("../modules/verifyToken");

// route
router.post("/", (req, res) => {
    const token = req.cookies.token;
    const username = verifyToken(token);
    if (username) {
        res.status(200).json({
            message: `User ${username} verified!`,
        });
    } else {
        res.status(401).json({
            error: "Invalid username",
        });
    }
});

module.exports = router;

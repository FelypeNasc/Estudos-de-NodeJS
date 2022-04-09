const fs = require("fs");
const express = require("express");
const router = express.Router();
router.use(express.json());

// modules
const removeToken = require("../modules/removeToken");

// route
router.post("/", (req, res) => {
    const token = req.cookies.token;
    if (removeToken(token) !== false) {
        res.status(200).json({
            message: "Logout successful",
        });
    } else {
        res.status(401).json({
            error: "Invalid username or token",
        });
    }
});

module.exports = router;

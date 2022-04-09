const fs = require("fs");
const express = require("express");
const router = express.Router();
router.use(express.json());

// middlewares

// modules
const userExists = require("../modules/userExists");
const registerUser = require("../modules/registerUser");

// route
router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (userExists(username)) {
        res.status(409).json({
            error: "User already exists",
        });
    } else {
        try {
            const token = createToken(username);
            res.status(200).json({
                token: token,
            });
        } catch (err) {
            console.log("Err: Token not created");
            res.status(500).json({
                error: "Internal server error",
            });
        }
    }
});

module.exports = router;

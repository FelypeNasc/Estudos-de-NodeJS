const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// routes
const login = require("./routes/login");
const logout = require("./routes/logout");
const auth = require("./routes/auth");
const register = require("./routes/register");
app.use("/login", login);
app.use("/logout", logout);
app.use("/auth", auth);
app.use("/register", register);

// frontend route
app.use(express.static(__dirname + "/public"));

app.listen(port, () => console.log("Server started on port " + port));

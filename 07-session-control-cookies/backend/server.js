const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
app.use(cors());

// routes
const login = require("./routes/login");
const logout = require("./routes/logout");
const token = require("./routes/token");
app.use("/login", login);
app.use("/logout", logout);
app.use("/token", token);

app.listen(port, () => console.log("Server started on port " + port));

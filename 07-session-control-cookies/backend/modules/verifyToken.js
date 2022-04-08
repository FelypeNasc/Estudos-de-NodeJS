const fs = require("fs");

function verifyToken(_token) {
    const token = _token;
    const filePath = "../backend/data/users.json";
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const user = users.find((user) => user.token === token);
    if (user.token === token) {
        return user.username;
    } else {
        return false;
    }
}

module.exports = verifyToken;

const fs = require("fs");

function verifyPassword(_username, _password) {
    const username = _username;
    const password = _password;
    const filePath = "../backend/data/users.json";
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const user = users.find((user) => user.username === username);
    if (user) {
        if (user.password === password) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

module.exports = verifyPassword;

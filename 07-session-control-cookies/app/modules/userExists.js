const fs = require("fs");

function userExists(_username) {
    const username = _username;
    const filePath = "../app/data/users.json";
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const user = users.find((user) => user.username === username);
    if (user) {
        return true;
    } else {
        return false;
    }
}

module.exports = userExists;

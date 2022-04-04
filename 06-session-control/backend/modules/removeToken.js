const fs = require("fs");

function removeToken( _token) {
    const token = _token;
    const filePath = "../backend/data/users.json";
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const user = users.find((user) => user.token === token);
    if (user) {
        console.log("User found");
        const userIndex = users.indexOf(user);
        if (user.token === token) {
            users[userIndex].token = "";
            fs.writeFile(filePath, JSON.stringify(users), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Token removed");
                    return true;
                }
            });
        } else {
            return false;
        }
    } else {
        return false;
    }
}

module.exports = removeToken;

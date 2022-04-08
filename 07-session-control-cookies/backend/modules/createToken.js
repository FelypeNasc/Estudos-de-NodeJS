const fs = require("fs");
function createRandomToken(_username, length = 64) {
    const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*!@#$%^&*()_+";
    let token = "";
    for (let x = 0; x < length; x++) {
        let i = Math.floor(Math.random() * chars.length);
        token += chars.charAt(i);
    }
    putToken(_username, token);
    return token;
}

function putToken(_username, _token) {
    const username = _username;
    const filePath = "../backend/data/users.json";
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const user = users.find((user) => user.username === username);
    if (user) {
        const userIndex = users.indexOf(user);
        users[userIndex].token = _token;
        fs.writeFile(filePath, JSON.stringify(users), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Token created");
                return true;
            }
        });
    }
}
module.exports = createRandomToken;

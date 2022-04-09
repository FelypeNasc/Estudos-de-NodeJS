const fs = require("fs");

async function registerUser(_username, _password) {
    const username = _username;
    const password = _password;
    const filePath = "../app/data/users.json";
    const users = await JSON.parse(fs.readFileSync(filePath, "utf8"));
    try {
        users.push({
            username: username,
            password: password,
            token: "",
        });
        await fs.writeFileSync(filePath, JSON.stringify(users));
        return true;
    } catch (err) {
        console.log("User not created. Err: " + err);
        return false;
    }
}

module.exports = registerUser;

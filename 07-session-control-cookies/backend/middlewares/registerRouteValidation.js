const newUser = (req, res, next) => {
    const users = JSON.parse(fs.readFileSync("../data/users.json"));
    const user = users.find((user) => user.username === req.body.data.username);

    if (user) {
        req.validations = false;
        next();
    }

    const newUserData = {
        fName: req.body.data.fName,
        lName: req.body.data.lName,
        email: req.body.data.email,
        //FIXME use bcrypt here
        password: req.body.data.password,
        img: `https://picsum.photos/id/${Math.ceil(Math.random() * 500)}/768`,
    };

    users.push(newUserData);

    //FIXME replace with postgres
    fs.writeFile(
        __dirname + "/../database/users.json",
        JSON.stringify(users),
        (err) => {
            if (err) throw err;
        }
    );

    req.user = {
        fName: newUserData.fName,
        lName: newUserData.lName,
        email: newUserData.email,
    };

    req.validations = true;
    next();
};

module.exports = newUser;

const fs = require("fs");

function addReqBodyToJSON (filePath, reqBody) {
    function pushToUsers(data, reg) {
        let arr = JSON.parse(data);
        arr.push(reg);
        return JSON.stringify(arr);
    }

    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        fs.writeFile(
            filePath,
            pushToUsers(data, reqBody),
            (err) => {
                if (err) throw err;
            }
        );
    })
}

// use this to import: const addReqToJSON = require("../modules/addReqToJSON");

module.exports = addReqBodyToJSON;
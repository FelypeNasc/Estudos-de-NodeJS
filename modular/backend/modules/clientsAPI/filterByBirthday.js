function filterByBirthday (_month, _arr) {
    return _arr.filter((el) => {
        return parseInt(el.birthday.slice(3,5)) == _month;
    })
}

module.exports = filterByBirthday;
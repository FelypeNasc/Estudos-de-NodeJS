function filterByBirthday (_month) {
    return users.filter((el) => {
        return parseInt(el.birthday.slice(3,5)) == _month;
    })
}

export { filterByBirthday };
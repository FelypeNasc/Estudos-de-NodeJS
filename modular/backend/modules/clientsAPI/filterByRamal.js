function sortByRamal(_arr) {
    let newArr = _arr.sort((a,b) => (a.extension > b.extension) ? 1 : ((b.extension > a.extension) ? -1 : 0))
    newArr.forEach(element => {
        delete element.id
        delete element.department
        delete element.email
        delete element.birthday
        delete element.firstName
        delete element.lastName
    });
    return newArr
}

module.exports = sortByRamal;
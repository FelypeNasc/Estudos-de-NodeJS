function sortByRamal(_arr) {
    let newArr = _arr.sort((a,b) => (a.ramal > b.ramal) ? 1 : ((b.ramal > a.ramal) ? -1 : 0))
    newArr.forEach(element => {
        delete element.id
        delete element.department
        delete element.email
        delete element.birthday
    });
    return newArr
}

module.exports = sortByRamal;
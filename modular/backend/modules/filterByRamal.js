function sortByRamal(_arr) {
    return _arr.sort((a,b) => (a.ramal > b.ramal) ? 1 : ((b.ramal > a.ramal) ? -1 : 0))
}

module.exports = sortByRamal;
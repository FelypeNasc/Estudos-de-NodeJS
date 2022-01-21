function filterBySector (_sector, _arr) {
    return _arr.filter((el) => {
        return el.sector == _sector;
    })
}

module.exports = filterBySector;
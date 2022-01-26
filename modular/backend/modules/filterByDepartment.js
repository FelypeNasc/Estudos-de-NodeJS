function filterBySector (_department, _arr) {
    return _arr.filter((el) => {
        return el.department == _department;
    })
}

module.exports = filterBySector;
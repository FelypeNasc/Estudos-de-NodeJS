function filterBySector (_sector) {
    return users.filter((el) => {
        return el.sector == _sector;
    })
}

export { filterBySector };

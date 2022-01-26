function searchInUsers(searchType, searchInput, arr) {
    let usersFound =[];
    arr.forEach((currItem) => {
        const currItemKey = String(currItem[searchType]);
        if (currItemKey.includes(searchInput)) {
            usersFound.push(currItem);
        }
    })
    console.log(usersFound)
    return usersFound;
}

module.exports = searchInUsers;

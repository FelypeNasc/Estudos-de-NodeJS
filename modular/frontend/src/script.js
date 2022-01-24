const inputTypeSelect = document.getElementById('search-type');
const inputField = document.getElementById('search-input')
const resTBody = document.getElementById('result-table-tbody');
inputField.addEventListener('input', sendSearchWithTimeout);
let timeoutSet;

function sendSearchWithTimeout() {
    clearTimeout(timeoutSet)
    timeoutSet = setTimeout(sendSearch, 2000);
}

function sendSearch () {
    resTBody.innerHTML = '';
    const inputType = inputTypeSelect.options[inputTypeSelect.selectedIndex].value;
    const inputFieldValue = inputField.value;

    const searchRequest = fetch(`/users?${inputType}=${inputFieldValue}`);

    searchRequest
    .then((res) => {
        const resJson = res.json()
        return resJson;
    })
    .then((users)=> {
        users.forEach((currItem) => {
            addToTable(currItem.id, currItem.name, currItem.email, currItem.sector, currItem.birthday, currItem.ramal);
        })
        console.log(users);
    })
}

function addToTable (id, name, email, sector, birthday, ramal) {
    $resTBody.innerHTML += 
    `
    <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${sector}</td>
        <td>${email}</td>
        <td>${birthday}</td>
        <td>${ramal}</td>
    </tr>
    `
}
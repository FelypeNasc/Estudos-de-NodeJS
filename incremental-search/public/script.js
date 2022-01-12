const $inputTypeSelect = document.getElementById('searchType');
const $inputField = document.getElementById('searchInput')
const $resTBody = document.getElementById('resultTableTBody');
$inputField.addEventListener('input', sendSearchWithTimeout);
let timeoutSet;

function sendSearchWithTimeout() {
    clearTimeout(timeoutSet)
    timeoutSet = setTimeout(sendSearch, 2000);
}

function sendSearch () {
    $resTBody.innerHTML = '';
    const inputType = $inputTypeSelect.options[$inputTypeSelect.selectedIndex].value;
    const inputFieldValue = $inputField.value;

    //guarda
    if (inputType === 'id' && inputFieldValue.length < 1 || inputType !== 'id' && inputFieldValue.length < 3 ) {
        return
    }

    const searchRequest = fetch(`/users?${inputType}=${inputFieldValue}`);

    searchRequest
    .then((res) => {
        const resJson = res.json()
        return resJson;
    })
    .then((users)=> {
        users.forEach((currItem) => {
            addToTable(currItem.id, currItem.name, currItem.email);
        })
        console.log(users);
    })

}

function addToTable (id, name, email) {
    $resTBody.innerHTML += 
    `
    <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${email}</td>
    </tr>
    `
}
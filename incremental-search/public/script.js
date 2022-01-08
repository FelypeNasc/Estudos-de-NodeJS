const $inputTypeSelect = document.getElementById('searchType');
const $inputField = document.getElementById('searchInput')
const $sendButton = document.getElementById('sendSearchButton');
const $resTBody = document.getElementById('resultTableTBody');

$inputField.addEventListener('input', sendSearch)

function sendSearch () {
    $resTBody.innerHTML = ''
    const inputType = $inputTypeSelect.options[$inputTypeSelect.selectedIndex].value
    const inputFieldValue = $inputField.value
    // console.log(inputType)
    // console.log(inputFieldValue)

    if (inputType === 'id' && inputFieldValue.length < 1 || inputType !== 'id' && inputFieldValue.length < 3 ) {
        return
    }

    const searchRequest = fetch(`/users?${inputType}=${inputFieldValue}`)

    searchRequest.then((res) => {
        const resJson = res.json()
        return resJson
    })

    .then((users)=> {
        users.forEach((currItem) => {
            addToTable(currItem.id, currItem.name, currItem.email)
        })
        console.log(users)
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
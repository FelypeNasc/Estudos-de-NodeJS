const $inputTypeSelect = document.getElementById('searchType');
const $inputField = document.getElementById('searchInput')
const $sendButton = document.getElementById('sendSearchButton');
const $resTBody = document.getElementById('resultTableTBody');

$sendButton.addEventListener('click', sendSearch)

document.addEventListener('load', () => {
    $sendButton.addEventListener('click', sendSearch);
})

function sendSearch () {
    $resTBody.innerHTML = ''
    const inputType = $inputTypeSelect.options[$inputTypeSelect.selectedIndex].value
    const inputFieldValue = $inputField.value
    // console.log(inputType)
    // console.log(inputFieldValue)

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
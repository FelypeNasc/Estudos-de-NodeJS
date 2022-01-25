// page
const inputTypeSelect = document.getElementById('search-type');
const inputField = document.getElementById('search-input')
const resTBody = document.getElementById('result-table-tbody');
const ramalsBtn = document.getElementById('view-ramals')
// new employee
const newEmployeeBtn = document.getElementById('add-new-employee');
const exitBtn = document.getElementById('new-employee-exit-button');
const idField = document.getElementById('new_employee_id_field');
const idName = document.getElementById('new_employee_name_field');
const idSector = document.getElementById('new_employee_sector_field');
const idEmail = document.getElementById('new_employee_email_field');
const idBirthday = document.getElementById('new_employee_birthday_field');
const idRamal = document.getElementById('new_employee_ramal_field');

// listeners
newEmployeeBtn.addEventListener('click', newEmployeeScreen);
exitBtn.addEventListener('click', newEmployeeScreen);
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
        `;
    }

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

function newEmployeeScreen() {
    const newEmployeeScreen = document.getElementById('new-employee-container');
    if (newEmployeeScreen.classList.contains('hide')) {
        newEmployeeScreen.classList.remove('hide');
    } else {
        newEmployeeScreen.classList.add('hide');
    }
}
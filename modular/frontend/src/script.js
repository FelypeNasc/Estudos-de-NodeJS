// page
const inputTypeSelect = document.getElementById('search-type');
const inputField = document.getElementById('search-input')
const resTBody = document.getElementById('result-table-tbody');
const ramalsBtn = document.getElementById('view-ramals')
// new employee
const newEmployeeBtn = document.getElementById('add-new-employee');
const exitBtn = document.getElementById('new-employee-exit-button');


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

    const appUrl = 'http://localhost:3040/'

    function addToTable (id, name, email, sector, birthday, ramal) {
        resTBody.innerHTML += 
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

    fetch(appUrl + `users?${inputType}=${inputFieldValue}`)
    .then((res) => {
        const resJson = res.json()
        console.log(resJson)
        return resJson;
    })
    .then((users)=> {
        users.forEach((currItem) => {
            addToTable(currItem.id, currItem.fullName, currItem.email, currItem.department, currItem.birthday, currItem.extension);
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

function addNewEmployee () {
    const id = document.getElementById('new_employee_id_field').value;
    const name = document.getElementById('new_employee_name_field').value;
    const sector = document.getElementById('new_employee_sector_field').value;
    const email = document.getElementById('new_employee_email_field').value;
    const birthday = document.getElementById('new_employee_birthday_field').value;
    const ramal = document.getElementById('new_employee_ramal_field').value;
    const searchRequest = fetch(`/add-new-employee?id=${id}&name=${name}&sector=${sector}&email=${email}&birthday${birthday}&ramal=${ramal}`);
}

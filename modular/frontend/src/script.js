// page
const inputTypeSelect = document.getElementById('search-type');
const inputField = document.getElementById('search-input');
const ramalsBtn = document.getElementById('view-ramals');
const resTableContainer = document.getElementById('result-table-container');
const ramalsTableContainer = document.getElementById('ramals-table-container');
const appUrl = 'http://localhost:3040/';

// new employee
const newEmployeeBtn = document.getElementById('add-new-employee');
const exitBtn = document.getElementById('new-employee-exit-button');

// listeners
newEmployeeBtn.addEventListener('click', changeToNewEmployeeScreen);
exitBtn.addEventListener('click', changeToNewEmployeeScreen);
ramalsBtn.addEventListener('click', verifyRamals);
inputField.addEventListener('input', sendSearchWithTimeout);
let timeoutSet;

function sendSearchWithTimeout() {
    clearTimeout(timeoutSet)
    timeoutSet = setTimeout(sendSearch, 2000);
}

function sendSearch () {
    const resTBody = document.getElementById('result-table-tbody');
    resTBody.innerHTML = '';
    const inputType = inputTypeSelect.options[inputTypeSelect.selectedIndex].value;
    const inputFieldValue = inputField.value;

    if (resTableContainer.classList.contains('hide')) {
        resTableContainer.classList.remove('hide');
    }

    fetch(appUrl + `users?${inputType}=${inputFieldValue}`)
    .then((res) => {
        const resJson = res.json()
        return resJson;
    })
    .then((users)=> {
        users.forEach((currItem) => {
            resTBody.innerHTML += 
            `
            <tr>
                <td>${currItem.id}</td>
                <td>${currItem.fullName}</td>
                <td>${currItem.department}</td>
                <td>${currItem.email}</td>
                <td>${currItem.birthday}</td>
                <td>${currItem.extension}</td>
            </tr>
            `;
        })
        console.log(users);
    })
}

function changeToNewEmployeeScreen() {
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
    const department = document.getElementById('new_employee_department_field').value;
    const email = document.getElementById('new_employee_email_field').value;
    const birthday = document.getElementById('new_employee_birthday_field').value;
    const ramal = document.getElementById(' ').value;
    const searchRequest = fetch(`${appUrl}add-new-employee?id=${id}&name=${name}&department=${department}&email=${email}&birthday${birthday}&ramal=${ramal}`, 
        {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({a: 1, b: 'Textual content'})
        }
    );
}

function verifyRamals() {
    fetch(`${appUrl}ramals`)
    .then ((res) => {
        return res.json();
    })
    .then ((ramals) => {
        const ramalsTBody = document.getElementById('ramals-table-tbody');
        ramalsTBody.innerHTML = '';

        resTableContainer.classList.add('hide');
        ramalsTableContainer.classList.remove('hide')
        
        ramals.forEach((currItem) => {
            ramalsTBody.innerHTML += `
            <tr>
                <td>${currItem.extension}</td>
                <td>${currItem.fullName}</td>
            </tr>
            `
        })
    })
}

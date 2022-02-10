// page
const inputTypeSelect = document.getElementById("search-type");
const inputField = document.getElementById("search-input");
const ramalsBtn = document.getElementById("view-ramals");
const resTableContainer = document.getElementById("result-table-container");
const ramalsTableContainer = document.getElementById("ramals-table-container");
const appUrl = "http://localhost:3040/clients/";

// new employee
const newEmployeeBtn = document.getElementById("add-new-employee");
const exitBtn = document.getElementById("new-employee-exit-button");
const sendNewEmployee = document.getElementById("new-employee-send-button");

// listeners
newEmployeeBtn.addEventListener("click", changeToNewEmployeeScreen);
exitBtn.addEventListener("click", changeToNewEmployeeScreen);
ramalsBtn.addEventListener("click", verifyRamals);
inputField.addEventListener("input", sendSearchWithTimeout);
sendNewEmployee.addEventListener("click", addNewEmployee);
let timeoutSet;

function sendSearchWithTimeout() {
    clearTimeout(timeoutSet);
    if (resTableContainer.classList.contains("hide")) {
        resTableContainer.classList.remove("hide");
        ramalsTableContainer.classList.add("hide");
    }
    timeoutSet = setTimeout(sendSearch, 2000);
}

function sendSearch() {
    const resTBody = document.getElementById("result-table-tbody");
    resTBody.innerHTML = "";
    const inputType =
        inputTypeSelect.options[inputTypeSelect.selectedIndex].value;
    const inputFieldValue = inputField.value;

    fetch(appUrl + `users?${inputType}=${inputFieldValue}`)
        .then((res) => {
            const resJson = res.json();
            return resJson;
        })
        .then((users) => {
            users.forEach((currItem) => {
                resTBody.innerHTML += `
            <tr>
                <td>${currItem.id}</td>
                <td>${currItem.fullName}</td>
                <td>${currItem.department}</td>
                <td>${currItem.email}</td>
                <td>${currItem.birthday}</td>
                <td>${currItem.extension}</td>
            </tr>
            `;
            });
        });
}

// function to change the new employee register view
function changeToNewEmployeeScreen() {
    const newEmployeeScreen = document.getElementById("new-employee-container");
    const newEmployeeAdded = document.getElementById("new-employee-response");
    if (newEmployeeScreen.classList.contains("hide")) {
        newEmployeeScreen.classList.remove("hide");
        newEmployeeAdded.innerText = "";
    } else {
        newEmployeeScreen.classList.add("hide");
    }
}

function addNewEmployee() {
    const birthday = document.getElementById(
        "new-employee-birthday-field"
    ).value;
    const firstName = document.getElementById(
        "new-employee-firstName-field"
    ).value;
    const lastName = document.getElementById(
        "new-employee-lastName-field"
    ).value;
    const fullName = `${firstName} ${lastName}`;
    const email = document.getElementById("new-employee-email-field").value;
    const department = document.getElementById(
        "new-employee-department-field"
    ).value;
    const extension = document.getElementById("new-employee-ramal-field").value;
    const id = document.getElementById("new-employee-id-field").value;

    fetch(`${appUrl}add-new-employee`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            birthday,
            firstName,
            lastName,
            fullName,
            email,
            department,
            extension,
            id,
        }),
    }).then((res) => {
        if (res.status == 201) {
            document.getElementById("new-employee-response").innerText =
                "Employee Registered";
        }
    });
}

function verifyRamals() {
    fetch(`${appUrl}ramals`)
        .then((res) => {
            return res.json();
        })
        .then((ramals) => {
            const ramalsTBody = document.getElementById("ramals-table-tbody");
            ramalsTBody.innerHTML = "";

            resTableContainer.classList.add("hide");
            ramalsTableContainer.classList.remove("hide");

            ramals.forEach((currItem) => {
                ramalsTBody.innerHTML += `
            <tr>
                <td>${currItem.extension}</td>
                <td>${currItem.fullName}</td>
            </tr>
            `;
            });
        });
}

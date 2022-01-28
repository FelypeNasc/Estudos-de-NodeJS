// html variables

// new customer html variables
const newID = document.getElementById("new-customer-id");
const newName = document.getElementById("new-customer-name");
const newEmail = document.getElementById("new-customer-email");
const sendNewCustomerButton = document.getElementById("send-new-customer");

// search customers html variables
const searchOptionField = document.getElementById("search-type");
const sendSearchButton = document.getElementById("send-search");
const customersFoundTBody = document.getElementById("customers-found-tbody");

// listeners
sendNewCustomerButton.addEventListener("click", sendNewCustomer);
sendSearchButton.addEventListener("click", searchCustomers);

// client functions
function renderTable(users) {
    customersFoundTBody.innerText = "";
    let count = 0;
    users.forEach((currItem) => {
        customersFoundTBody.innerHTML += `
        <tr>
            <td>${currItem.id}</td>
            <td>${currItem.name}</td>
            <td>${currItem.email}</td>
            <td><button id="${count}" class='delete-button'>X</button></td>
        </tr>
        `;
        count++;
    });
    const deleteButton = document.querySelectorAll(".delete-button");
    Array.from(deleteButton).forEach((el) => {
        el.addEventListener("click", (e) => deleteCustomer(e.target.id));
    });
}

// request functions
function sendNewCustomer() {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: newID.value,
            name: newName.value,
            email: newEmail.value,
        }),
    };
    fetch("/add-new-customer", requestOptions).then((res) => {
        if (res.status == 201) {
            alert("Customer Registered");
        }
    });
}

function searchCustomers() {
    const searchOption =
        searchOptionField.options[
            searchOptionField.selectedIndex
        ].value.toLowerCase();
    const searchField = document.getElementById("search-field").value;
    fetch(`/search-customers?${searchOption}=${searchField}`)
        .then((res) => {
            return res.json();
        })
        .then((users) => {
            renderTable(users);
        });
}

function deleteCustomer(index) {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            index,
        }),
    };
    fetch("/delete-customer", requestOptions)
        .then((res) => {
            if (res.status == 200) {
                alert("Customer Deleted");
            }
            return res.json();
        })
        .then((users) => {
            renderTable(users);
        });
}

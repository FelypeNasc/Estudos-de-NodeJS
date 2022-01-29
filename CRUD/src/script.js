// html variables

// new product html variables
const newID = document.getElementById("new-product-id");
const newName = document.getElementById("new-product-name");
const newEmail = document.getElementById("new-product-email");
const sendNewProductButton = document.getElementById("send-new-product");

// search products html variables
const searchOptionField = document.getElementById("search-type");
const sendSearchButton = document.getElementById("send-search");
const productsFoundTBody = document.getElementById("products-found-tbody");

// listeners
sendNewProductButton.addEventListener("click", sendNewProduct);
sendSearchButton.addEventListener("click", searchProducts);

// client functions
function renderTable(users) {
    productsFoundTBody.innerText = "";
    let count = 0;
    users.forEach((currItem) => {
        productsFoundTBody.innerHTML += `
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
        el.addEventListener("click", (e) => deleteProduct(e.target.id));
    });
}

// request functions
function sendNewProduct() {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: newID.value,
            name: newName.value,
            email: newEmail.value,
        }),
    };
    fetch("/add-new-product", requestOptions).then((res) => {
        if (res.status == 201) {
            alert("Product Registered");
        }
    });
}

function searchProducts() {
    const searchOption =
        searchOptionField.options[
            searchOptionField.selectedIndex
        ].value.toLowerCase();
    const searchField = document.getElementById("search-field").value;
    fetch(`/search-products?${searchOption}=${searchField}`)
        .then((res) => {
            return res.json();
        })
        .then((users) => {
            renderTable(users);
        });
}

function deleteProduct(index) {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            index,
        }),
    };
    fetch("/delete-product", requestOptions)
        .then((res) => {
            if (res.status == 200) {
                alert("Product Deleted");
            }
            return res.json();
        })
        .then((users) => {
            renderTable(users);
        });
}

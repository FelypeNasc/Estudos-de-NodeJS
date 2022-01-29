// html variables

// new product html variables
const newID = document.getElementById("new-product-id");
const newName = document.getElementById("new-product-name");
const sendNewProductButton = document.getElementById("send-new-product");

// change product name html variables
const changeIDField = document.getElementById("change-product-id");
const changeNameField = document.getElementById("change-product-name");
const sendChangeNameButton = document.getElementById("send-change-product");

// search products html variables
const searchOptionField = document.getElementById("search-type");
const sendSearchButton = document.getElementById("send-search");
const searchTypeField = document.getElementById("search-field");
const productsFoundTBody = document.getElementById("products-found-tbody");

// listeners
sendNewProductButton.addEventListener("click", sendNewProduct);
sendSearchButton.addEventListener("click", searchProducts);
sendChangeNameButton.addEventListener("click", changeProductName);

// client functions
function renderTable(products) {
    productsFoundTBody.innerText = "";
    let count = 0;
    products.forEach((currItem) => {
        productsFoundTBody.innerHTML += `
        <tr>
            <td>${currItem.id}</td>
            <td>${currItem.name}</td>
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

// POST REQUEST

function sendNewProduct() {
    const id = newID.value;
    const name = newName.value;

    if (id.length < 1 || name.length <1) {
        alert("ID field and/or Name field is empty");
        return
    }
    
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id,
            name,
        }),
    };
    fetch("/products", requestOptions).then((res) => {
        if (res.status == 201) alert("Product Registered");
        else if (res.status == 406)
            alert("ERROR: This ID is already being used");
    });
}

// GET REQUEST

function searchProducts() {
    const id = searchTypeField.value;
    
    if (id.length < 1) {
        alert("ID field is empty");
        return
    }

    function verifyIDField() {
        if (id == "all") return `/products/all`;
        else return `products?id=${id}`;
    }

    fetch(verifyIDField())
        .then((res) => {
            return res.json();
        })
        .then((products) => {
            renderTable(products);
        });
}

// DELETE REQUEST

function deleteProduct(index) {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            index,
        }),
    };
    fetch("/products", requestOptions)
        .then((res) => {
            if (res.status == 200) alert("Product Deleted");

            return res.json();
        })
        .then((products) => {
            renderTable(products);
        });
}

// PUT REQUEST

function changeProductName() {
    const id = changeIDField.value;
    const name = changeNameField.value;

    if (id.length < 1 || name.length <1) {
        alert("ID field and/or Name field is empty");
        return
    }

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id,
            name,
        }),
    };
    fetch("/products", requestOptions)
        .then((res) => {
            if (res.status == 200) {
                alert("Product Name Changed");
                return res.json();
            } else if (res.status == 404) {
                alert("This ID does not exist");
            }
        })
        .then((products) => {
            if (products) renderTable(products);
        });
}

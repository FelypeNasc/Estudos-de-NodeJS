// html variables

// new product html variables
const newID = document.getElementById("new-product-id");
const newName = document.getElementById("new-product-name");
const sendNewProductButton = document.getElementById("send-new-product");

// search products html variables
const searchOptionField = document.getElementById("search-type");
const sendSearchButton = document.getElementById("send-search");
const productsFoundTBody = document.getElementById("products-found-tbody");

// listeners
sendNewProductButton.addEventListener("click", sendNewProduct);
sendSearchButton.addEventListener("click", searchProducts);

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
function sendNewProduct() {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: newID.value,
            name: newName.value,
        }),
    };
    fetch("/products", requestOptions).then((res) => {
        if (res.status == 201)
            alert("Product Registered");
        else if (res.status == 406)
            alert("ERROR: This ID is already being used");
    });
}

function searchProducts() {
    const id = document.getElementById("search-field").value;

    function verifyIDField() {
        if (id == "all") 
            return `/products/all`;
        else 
            return `products?id=${id}`;
        
    }
    
    fetch(verifyIDField())
        .then((res) => {
            return res.json();
        })
        .then((products) => {
            renderTable(products);
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
    fetch("/products", requestOptions)
        .then((res) => {
            if (res.status == 200) {
                alert("Product Deleted");
            }
            return res.json();
        })
        .then((products) => {
            renderTable(products);
        });
}

// function changeProductName () {
//     const id = 
// }
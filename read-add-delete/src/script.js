// html variables

// new customer
const newID =  document.getElementById('new-customer-id');
const newName = document.getElementById('new-customer-name');
const newEmail = document.getElementById('new-customer-email');
const sendNewCustomerButton = document.getElementById('send-new-customer');

// listeners
sendNewCustomerButton.addEventListener('click', sendNewCustomer);

//
function sendNewCustomer () {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: newID.value, name: newName.value,email: newEmail.value})
    }
    fetch('/add-new-customer', requestOptions)
    .then((res) => {
        if(res.status == 201) {
            document.getElementById('new-customer-response').innerHTML = 'Customer Registered';
        }
    })
}
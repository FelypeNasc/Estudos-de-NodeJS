const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const verifyButton = document.getElementById("verify-button");
const tokenHolder = document.getElementById("token-holder");

loginButton.addEventListener("click", loginRequest);
logoutButton.addEventListener("click", lougoutRequest);
verifyButton.addEventListener("click", tokenVerificationRequest);

function loginRequest() {
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    const statusMessage = document.getElementById("status-message");
    const logoutStatus = document.getElementById("logout-status");

    if (username.length < 3 || password.length < 3) {
        statusMessage.innerHTML = "Username and password must be at least 3 characters long";
        logoutStatus.style.display = "none";
        statusMessage.classList.remove("hidden");
        return;
    }
    statusMessage.innerHTML = "";
    statusMessage.classList.add("hidden");

    const url = "http://localhost:8080/login";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                statusMessage.innerHTML = data.error;
                logoutStatus.style.display = "none";
                statusMessage.style.display = "block";
            } else {
                tokenHolder.value = data.token;
                toggleScreen();
                username.value = "";
                password.value = "";
            }
        });
}

function lougoutRequest() {
    const logoutStatus = document.getElementById("logout-status");
    const verificationStatus = document.getElementById("verification-status");
    const url = "http://localhost:8080/logout";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: tokenHolder.value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                verificationStatus.innerHTML = data.error;
                verificationStatus.style.display = "block";
            } else {
                tokenHolder.value = "";
                toggleScreen();
                logoutStatus.innerHTML = "Logout successful";
                logoutStatus.style.display = "block";
                logoutStatus.style.color = "#1fd346";
            }
        });
}

function tokenVerificationRequest() {
    const token = document.getElementById("token-holder").value;
    fetch("http://localhost:8080/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            const statusMessage = document.getElementById("verification-status");
            if (data.error) {
                statusMessage.innerHTML = data.error;
                statusMessage.style.color = "#f34b4b";
            } else {
                statusMessage.innerHTML = data.message;
                statusMessage.style.color = "#1fd346";
            }
            statusMessage.style.display = "block";
        });
}

function toggleScreen() {
    const login = document.querySelector(".login-container");
    const tokenVerification = document.querySelector(".token-verification-container");

    if (login.classList.contains("hidden")) {
        login.classList.remove("hidden");
        tokenVerification.classList.add("hidden");
    } else {
        login.classList.add("hidden");
        tokenVerification.classList.remove("hidden");
    }
}

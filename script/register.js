import { urls } from "./module.mjs";



const register = document.querySelector("#Signup");
const regUsername = document.querySelector("#singup-name");
const regEmail = document.querySelector("#signup-email");
const regPassword = document.querySelector("#signup-password");
const errorsDiv = document.querySelector("#errors-div");



register.addEventListener("click", (e) => {
    e.preventDefault()
    const userReg = {
        name: regUsername.value,
        email: regEmail.value,
        password: regPassword.value,
    };
    registerFunc(urls.register, userReg)
})




const registerFunc = async (registerURL, userData) => {
    const res = await fetch (registerURL, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data.errors) {
        errorsDiv.innerHTML = ""
        var errorContainer = ""
        for (var i = 0; i < data.errors.length; i++) {
            console.log(data.errors[i])
            errorContainer += createError(data.errors[i])
          }
          errorsDiv.innerHTML = errorContainer;
    }
    else {
        regiLogin(urls.login, userData);

    }
    
}

const regiLogin = async (url, loginData) => {
    const res = await fetch (url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });
    const data = await res.json();
    
	console.log(data);
	localStorage.setItem("token", data.accessToken);
    window.location.href = "./posts.html"
}

const createError = (data) => {
    return `<p id="error">${data.message}</p>`
}
/* test user
name: testKit2
email: testKit2@noroff.no
password: testtestybleh */
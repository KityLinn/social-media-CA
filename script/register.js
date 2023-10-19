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


/**
 * fetches using the provided URL. Sends the object data to the API and reuests a user be created
 * @param {string} registerURL 
 * @param {object} userData 
 */

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
            errorContainer += createError(data.errors[i])
          }
          errorsDiv.innerHTML = errorContainer;
    }
    else {
        regiLogin(urls.login, userData);

    }
    
}
/**
 * Works similarly to login function.
 * Triggers if user registration is succesful and automatically logs them in and sends them to posts page
 * uses the login URL and the same object as registration function
 * @param {string} url 
 * @param {Object} loginData 
 */
const regiLogin = async (url, loginData) => {
    const res = await fetch (url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });
    const data = await res.json();
    localStorage.setItem("author", data.name)
	localStorage.setItem("token", data.accessToken);
    window.location.href = "./posts.html"
}
/**
 * handles the data from the error and returns a p with the error message
 * @param {Object} data 
 * @returns string html
 */
const createError = (data) => {
    return `<p id="error">${data.message}</p>`
}
/* test user
name: testKit2
email: testKit2@noroff.no
password: testtestybleh */
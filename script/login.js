import { urls } from "./module.mjs";

const logIn = document.querySelector("#login");
const logPassword = document.querySelector("#login-password");
const logemail = document.querySelector("#login-email")
const errorsDiv = document.querySelector("#errors-div");

logIn.addEventListener("click", (e) => {
    e.preventDefault()
    const userLogin = {
        password: logPassword.value,
        email: logemail.value,
    };
    loginFunc(urls.login, userLogin)
});



/**
 * fetches using the provided URL. Sends the object data to the API and makes a login request
 * @param {string} loginURL 
 * @param {object} userData 
 */
 const loginFunc = async (loginURL, userData) => {
    const res = await fetch (loginURL, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data.errors) {
        errorsDiv.innerHTML = ""
        let errorContainer = ""
        for (let i = 0; i < data.errors.length; i++) {
            errorContainer += createError(data.errors[i])
          }
          errorsDiv.innerHTML = errorContainer;
    }
    else {
        console.log(data)
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("author", data.name)
        window.location.href = "./posts.html"
    }


}

const createError = (data) => {
    return `<p id="error">${data.message}</p>`
}

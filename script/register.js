import { urls } from "./module.mjs";



const register = document.querySelector("#Signup");
const regUsername = document.querySelector("#singup-name");
const regEmail = document.querySelector("signup-email");
const regPassword = document.querySelector("#signup-password");

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
	console.log(data);
    regiLogin(urls.login, userData)
    
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


/* test user
name: testKit2
email: testKit2@noroff.no
password: testtestybleh */
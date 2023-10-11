import { urls } from "./module.mjs";


const register = document.querySelector("#Sign-up");
const regUsername = document.querySelector("#name-1");
const regEmail = document.querySelector("#email-1");
const regPassword = document.querySelector("#password-1");

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
    
}



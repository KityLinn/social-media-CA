const BASE_URL = "https://api.noroff.dev/api/v1/";

const urls = {
    login: BASE_URL + "social/auth/login",
    register: BASE_URL + "social/auth/register",
    post: (id) => BASE_URL + `social/posts/${postId}`,
    posts: BASE_URL + "social/posts",
  }


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



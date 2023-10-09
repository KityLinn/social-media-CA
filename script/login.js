const BASE_URL = "https://api.noroff.dev/api/v1/";

const urls = {
    login: BASE_URL + "social/auth/login",
    register: BASE_URL + "social/auth/register",
    post: (id) => BASE_URL + `social/posts/${postId}`,
    posts: BASE_URL + "social/posts",
  }


const logIn = document.querySelector("#login");
const logUsername = document.querySelector("#name-2");
const logEmail = document.querySelector("#email-2");
const logPassword = document.querySelector("#password-2");

logIn.addEventListener("click", (e) => {
    e.preventDefault
    const userLogin = {
        name: logUsername.value,
        email: logEmail.value,
        password: logPassword.value,
    };
    loginFunc(urls.login, userLogin)
})




const loginFunc = async (loginURL, userData) => {
    const res = await fetch (loginURL, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    const data = await res.json();
	console.log(data);
	localStorage.setItem("token", data.accessToken);
}



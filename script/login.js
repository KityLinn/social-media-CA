const BASE_URL = "https://api.noroff.dev/api/v1/";

const urls = {
    login: BASE_URL + "social/auth/login",
    register: BASE_URL + "social/auth/register",
    post: (id) => BASE_URL + `social/posts/${postId}`,
    posts: BASE_URL + "social/posts",
  }


const logIn = document.querySelector("#login");
const logUsername = document.querySelector("#login-name");
const logPassword = document.querySelector("#login-password");
const logemail = document.querySelector("#login-email")

logIn.addEventListener("click", (e) => {
    e.preventDefault()
    const userLogin = {
        username: logUsername.value,
        password: logPassword.value,
        email: logemail.value,
    };

    loginFunc(urls.login, userLogin)
});




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
    window.location.href = "./posts.html"

}


/* Username: Linn2
Email:Linn2@noroff.no
password: blipblopbloop102*/
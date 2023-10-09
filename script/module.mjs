const BASE_URL = "https://api.noroff.dev/api/v1/";

const urls = {
    login: BASE_URL + "social/auth/login",
    register: BASE_URL + "social/auth/register",
    post: (id) => BASE_URL + `social/posts/${postId}`,
    posts: BASE_URL + "social/posts",
  }
// logIn.addEventListener("click", loginFunk)

//location.href("/profile") // goes to profile page
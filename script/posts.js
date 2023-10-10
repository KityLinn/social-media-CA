const BASE_URL = "https://api.noroff.dev/api/v1/";

const urls = {
    login: BASE_URL + "social/auth/login",
    register: BASE_URL + "social/auth/register",
    post: (id) => BASE_URL + `social/posts/${postId}`,
    posts: BASE_URL + "social/posts",
  }



async function getPosts(url) {
	const token = localStorage.getItem("token");
	const res = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`, // what we use for authentication
		},
	});
	const data = await res.json();
	console.log(data);
}
getPosts(urls.posts)
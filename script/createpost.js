import { urls } from "./module.mjs";

const postSubmit = document.querySelector("#post-submit");
const postTitle = document.querySelector("#post-title");
const postContent = document.querySelector("#post-content");

postSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    const userLogin = {
        title: postTitle.value,
        body: postContent.value,
    };

    createPost(urls.createPost, userLogin)
});



const createPost = async (createURL, postData) => {
    const res = await fetch (createURL, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    });
    const data = await res.json();
	console.log(data);
	localStorage.setItem("token", data.accessToken);
    window.location.href = "./posts.html"

}
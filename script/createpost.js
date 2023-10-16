import { urls } from "./module.mjs";

const postSubmit = document.querySelector("#post-submit");
const postTitle = document.querySelector("#post-title");
const postContent = document.querySelector("#post-content");

postSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    const post = {
        title: postTitle.value,
        body: postContent.value,
    };

    createPost(urls.createPost, post)
});


/**
 * fetches based on the provided URL and sends the data to the API that creates a new post
 * @param {string} createURL 
 * @param {object} postData 
 */
const createPost = async (createURL, postData) => {
    const token = localStorage.getItem("token");
    const res = await fetch (createURL, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
    });
    const data = await res.json();
	console.log(data);
    window.location.href = "./posts.html"


}
import { urls } from "./module.mjs";

const user = localStorage.getItem("author");
let yourPosts = document.querySelector("#your-posts");
yourPosts.innerHTML = `<a class="btn btn-primary" href="./author.html?author=${user}"">Your posts</a>`;

const postSubmit = document.querySelector("#post-submit");
const postTitle = document.querySelector("#post-title");
const postContent = document.querySelector("#post-content");
const postImage = document.querySelector("#post-image")
const errorsDiv = document.querySelector("#errors-div");

postSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    const post = {
        title: postTitle.value,
        body: postContent.value,
        media: postImage.value,
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
    if (data.errors) {
        errorsDiv.innerHTML = ""
        let errorContainer = ""
        for (let i = 0; i < data.errors.length; i++) {
            errorContainer += createError(data.errors[i])
          }
          errorsDiv.innerHTML = errorContainer;
    }
    else {
        window.location.href = `./singlepost.html?id=${data.id}`
    }

 

}

const createError = (data) => {
    return `<p id="error">${data.message}</p>`
}


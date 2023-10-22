import { urls } from "./module.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

/**
 * fetches data based on a url with an ID.
 * Then renders out the content into a single post into two input fields
 * @param {string} url 
 */
const getEdit = async (url) => {
	const token = localStorage.getItem("token");
	const res = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await res.json();
  let {title, body, media} = data;
	let main = document.querySelector("#posts");
	main.innerHTML = "";
	  main.innerHTML += `
  <div class="form floating">
    <input type="text" id="post-title" class="form-control" name="title" value="${title}"/>
    <label class="fw-medium" for="post-title"></label>
  </div>


  <div class="form-floating">
  <textarea name="content" id="post-content" cols="30" rows="10">${body}</textarea>
  <label class="form-label" for="post-content"></label>
</div>

<div class="form-floating">
<input type="text" id="post-image" name="image"value="${media}"/>
<label class="form-label" for="post-image"></label>
</div>

<div>
<button type="submit" id="post-edit" class="btn btn-outline-primary">Edit your post</button>
</div>
<div id="errors-div">
</div> `;
const postEdit = document.querySelector("#post-edit");
const postTitle = document.querySelector("#post-title");
const postContent = document.querySelector("#post-content");


postEdit.addEventListener("click", (e) => {
    e.preventDefault()
    const post = {
        title: postTitle.value,
        body: postContent.value,
    };

    editPost(urls.editPost(id), post)
});

/**
 * fetches using hte provided URL and sends the object data to the API
 * also has error message if the user is not allowed to edit this post
 * @param {string} editURL 
 * @param {object} postData 
 */
const editPost = async (editURL, postData) => {
    const token = localStorage.getItem("token");
    const res = await fetch (editURL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
    });
    const data = await res.json();
    window.location.href = `./singlepost.html?id=${data.id}`
}

};

getEdit(urls.post(id))


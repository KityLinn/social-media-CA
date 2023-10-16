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
	console.log(data);
  var {title, body} = data;
	var main = document.querySelector("#posts");
	main.innerHTML = "";
	  main.innerHTML += `
  <div class="create-div">
    <label class="form-label" for="post-title">Your post title</label>
    <input type="text" id="post-title" name="title" value ="${title}"/>
  </div>

  <div class="create-div">
    <label class="form-label" for="post-content">Your post content</label>
    <textarea name="content" id="post-content" cols="30" rows="10">${body}</textarea>
  </div>

  <div class="create-div">
    <button type="submit" id="post-edit">Submit your post</button>
    <p id="error"></p>
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
	console.log(data);
  if (data.errors) {
		const error = document.querySelector("#error")
		error.innerHTML = "you do no have permission to edit this post"
	}
	else {
		window.location.href = "./posts.html"
	}

}

};

getEdit(urls.post(id))


import { urls } from "./module.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getPosts(url) {
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
	var main = document.querySelector("#posts");
	main.innerHTML = "";
	  main.innerHTML =`<div class="post">
      <h2>${data.title}</h2>
      <p>${data.body}</p>
	  <button id="delete">Delete Post</button>
    </div>`;
	deleteButtonFunc(data.id)

}

getPosts(urls.post(id))

const deleteButtonFunc = (id) => {
	const deleteButton = document.querySelector("#delete");
	deleteButton.addEventListener("click", (e) => {
		e.preventDefault
		deletePost(urls.delete(id))
		
		
	});	
}

const deletePost = async (deleteLink) => {
	const token = localStorage.getItem("token");
	const res = await fetch(deleteLink , {
		method: "DELETE",
		headers: {
			"Content-Type": "Application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await res.json();
	console.log(data);
}
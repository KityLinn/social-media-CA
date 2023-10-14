import { urls } from "./module.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const getPosts = async (url) => {
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
	  main.innerHTML +=`<div class="post">
      <h2>${data.title}</h2>
      <p>${data.body}</p>
	  <button id="delete">Delete Post</button>
	  <button id="edit">Edit Post</button>
    </div>`;
	deleteButtonFunc(data.id)
	editButtonFunc(data.id)
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
	window.location.href = "./posts.html"	
}

const editButtonFunc = (id) => {
	const editButton = document.querySelector("#edit");
	editButton.addEventListener("click", (e) => {
		e.preventDefault
		window.location.href = `./editpost.html?id=${id}`
	
	});	
}
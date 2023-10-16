import { urls } from "./module.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

/**
 * fetches with the provided url and renders out a single post
 * also creates delete and edit buttons
 * @param {*} url 
 */

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
	var {title, body, id} = data;
	  main.innerHTML +=`<div class="post">
      <h2>${title}</h2>
      <p>${body}</p>
	  <button id="delete">Delete Post</button>
	  <p id="error"></p>
	  <button id="edit">Edit Post</button>
    </div>`;
	deleteButtonFunc(id)
	editButtonFunc(id)
	document.title = title;
}

getPosts(urls.post(id))
/**
 * creates deleteButton variable and an onclick event
 * the even then triggers the delePost function using a url with the ID provided
 * @param {number} id 
 */

const deleteButtonFunc = (id) => {
	const deleteButton = document.querySelector("#delete");
	deleteButton.addEventListener("click", (e) => {
		e.preventDefault
		deletePost(urls.delete(id))
		
	});	
}
/**
 * deletes the current post based on the ID in the link
 * @param {number} deleteLink 
 */
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

	if (data.errors) {
		const error = document.querySelector("#error")
		error.innerHTML = "you do no have permission to delete"
	}
	else {
		window.location.href = "./posts.html"
	}
}

/**
 * creates editButton variable and attaches click event to it.
 * the click even then sends you to the editpost html page with the id
 * @param {number} id 
 */
const editButtonFunc = (id) => {
	const editButton = document.querySelector("#edit");
	editButton.addEventListener("click", (e) => {
		e.preventDefault
		window.location.href = `./editpost.html?id=${id}`
	
	});	
}

/*
	if (data.errors[0]) {
		console.log("you do not have permission")
	}
	else {
		window.location.href = "./posts.html"
	}
	console.log();
	*/
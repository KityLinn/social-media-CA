import { urls } from "./module.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const user = localStorage.getItem("author");
let yourPosts = document.querySelector("#your-posts");
yourPosts.innerHTML = `<a class="btn btn-primary" href="./author.html?author=${user}"">Your posts</a>`;

/**
 * fetches with the provided url and renders out a single post
 * also creates delete and edit buttons
 * @param {string} url 
 */

const getPosts = async (url) => {
	const token = localStorage.getItem("token");
	const user = localStorage.getItem("author");
	const res = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await res.json();
	let main = document.querySelector("#posts");
	main.innerHTML = "";
	let {title, id, author,} = data;
	  main.innerHTML += createPost(data)
	document.title = title;
	if (author.name === user) {
		main.innerHTML += `
		<button class="btn btn-outline-primary w-100" id="delete">Delete Post</button>
		<p id="error"></p>
		<button class="btn btn-outline-primary w-100" id="edit">Edit Post</button>`
		deleteButtonFunc(id)
		editButtonFunc(id)
	}
	else {

	}

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
 * @param {string} deleteLink 
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

/**
 * renders out a div with the content provided in data
 * checks for if there's meddia or body and creates different divs accordingly
 * @param {Array} data 
 * @returns 
 */
const createPost = (data) => {
	let {title, body, author, media} = data;
	if (!media && !body) {
		return`<div class="post card">
		<div class="card-body">
		  <h2 class="card-title">${title}</h2>
		  <a href="./author.html?author=${author.name}" class="btn btn-outline-primary">${author.name}</a>
		</div>
	  </div>`;
  }else if (!body) {
	return`<div class="post card">
  <div class="image">
    <img class="rounded" src="${media}" alt="${title}">
  </div>
	<div class="card-body">
	  <h2 class="card-title">${title}</h2>
	  <a href="./author.html?author=${author.name}" class="btn btn-outline-primary">${author.name}</a>
	</div>
  </div>`;
  }else if (!media) {
	return`<div class="post card">
	  <div class="card-body">
		<h2 class="card-title">${title}</h2>
		<p class="card-text">${body}</p>
		<a href="./author.html?author=${author.name}" class="btn btn-outline-primary">${author.name}</a>
	  </div>
	</div>`;
  }else {
	return`<div class="post card">
  <div class="image">
    <img class="rounded" src="${media}" alt="${title}">
  </div>
  <div class="card-body">
  <h2 class="card-title">${title}</h2>
  <p class="card-text">${body}</p>
  <a href="./author.html?author=${author.name}" class="btn btn-outline-primary">${author.name}</a>
  </div>
</div>`;
	}
  };


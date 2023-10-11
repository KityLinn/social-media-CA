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
    </div>`;
}

	 

getPosts(urls.post(id))
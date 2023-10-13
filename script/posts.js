import { urls } from "./module.mjs";



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
	var html = ""
	for (var i = 0; i < data.length; i++) {
		html += createPost(data[i]); 
	  }
	  main.innerHTML = html;
}
function createPost(data) {
	return `<div class="post">
			  <h2>${data.title}</h2>
			  <p>${data.body}</p>
			  <button onclick="showDetails(${data.id})">Details</button>
			  <a href="./singlepost.html?id=${data.id}">Details</a>
			</div>`;
			
  }
var postsNumber = 10

getPosts(urls.posts(postsNumber));

const morePosts = document.querySelector("#more");
morePosts.addEventListener("click", (e) => {
	e.preventDefault()
	getPosts(urls.posts(postsNumber+=10))
});

const search = document.querySelector("#search");
const searchButton = document.querySelector("#search-button");



searchButton.addEventListener("click", (e) => {
    e.preventDefault()
	search.value

});

	Array.filter((item)=>{return item.contains(søkeord)})

function filter() {
	var tag = document.querySelector("#tag-search").value;
	var active = document.querySelector("#active-check").checked;
	var url = urls.posts;
	if (tag) {
	  url += "&_tag=" + tag;
	}
	if (active) {
	  url += "&_active=true";
	}
	getPosts(url);
  }


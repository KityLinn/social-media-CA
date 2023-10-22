import { urls } from "./module.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const author = params.get("author")


const getAuthor = async (url) => {
    const token = localStorage.getItem("token");
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
    let html = "";
    for (let i = 0; i < data.length; i++) {
        html += createPost(data[i]);
      }
      main.innerHTML = html;

};
getAuthor(urls.singleProfile(author))


const createPost = (data) => {
  let {title, body, id, author, media} = data;
  if (!media && !body) {
		return`<div class="post card">
		<div class="card-body">
		  <h2 class="card-title">${title}</h2>
      <p class="card-text">${author.name}</p>
      <a href="./singlepost.html?id=${id}" class="btn btn-primary">Details</a>
		</div>
	  </div>`;
}else if (!body) {
  return`<div class="post card">
  <div class="image">
     <img class="rounded" src="${media}" alt="${title}">
  </div>
  <div class="card-body">
    <h2 class="card-title">${title}</h2>
    <p class="card-text">${author.name}</p>
    <a href="./singlepost.html?id=${id}" class="btn btn-primary">Details</a>
  </div>
  </div>`;
}else if (!media) {
  return`<div class="post card">
  <div class="card-body">
    <h2 class="card-title">${title}</h2>
    <p class="card-text">${body}</p>
    <p class="card-text">${author.name}</p>
    <a href="./singlepost.html?id=${id}" class="btn btn-primary">Details</a>
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
    <p class="card-text">${author.name}</p>
    <a href="./singlepost.html?id=${id}" class="btn btn-primary">Details</a>
  </div>
  </div>`;
  }
};
  
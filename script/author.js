import { urls } from "./module.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const author = params.get("author")

console.log(author)

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
    console.log(data)
    let main = document.querySelector("#posts");
    main.innerHTML = "";
    let html = "";
    for (let i = 0; i < data.length; i++) {
        html += createPost(data[i]);
      }
      main.innerHTML = html;

}

getAuthor(urls.singleProfile(author))


const createPost = (data) => {
    let {title, body, id, author} = data;
    return `<div class="post">
                <h2>${title}</h2>
                <p>${body}</p>
                <a href="./singlepost.html?id=${id}">Details</a>
                <p>${author.name}</p>
              </div>`;
  };
  
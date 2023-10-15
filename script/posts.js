import { urls } from "./module.mjs";
var notfind = document.querySelector("#notfind");
var page = 0;

const getPosts = async (url) => {
  var offset = page * 10;
  const token = localStorage.getItem("token");
  const res = await fetch(url + "&offset=" + offset, {
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
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += createPost(data[i]);
  }
  main.innerHTML = html;
}


getPosts(urls.posts(10));

const morePosts = document.querySelector("#more");
morePosts.addEventListener("click", (e) => {
  e.preventDefault();
  page++;
  getPosts(urls.posts(10));

});

const search = document.querySelector("#search");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  searchFunc(search.value, urls.search);
});

const searchFunc = (searchValue, searchURL) => {
  searchFetch(searchValue, searchURL);
};
const searchFetch = async (value, url) => {
  const token = localStorage.getItem("token");
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const searchData = data.filter(
    (e) =>
      e.body.toLowerCase().includes(value) ||
      e.title.toLowerCase().includes(value)
  );

  if (searchData.length == 0) {
    notfind.innerHTML = "could not find"
  } else {
    notfind.innerHTML = ""
    var main = document.querySelector("#posts");
    main.innerHTML = "";
    var html = "";
    for (var i = 0; i < searchData.length; i++) {
      html += createPost(searchData[i]);
    }
    main.innerHTML = html;
  };

  };

/*
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
*/
const createPost = (data) => {
  return `<div class="post">
			  <h2>${data.title}</h2>
			  <p>${data.body}</p>
			  <button onclick="showDetails(${data.id})">Details</button>
			  <a href="./singlepost.html?id=${data.id}">Details</a>
			</div>`;
};

var sorting = document.querySelector("#sorting")

sorting.addEventListener("change", (e) => {
  if (e.value == "desc") {

  }
  if (e.value == "asc" ) {
    
  }
})
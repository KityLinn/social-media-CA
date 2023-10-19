import { urls } from "./module.mjs";
var notfind = document.querySelector("#notfind");
var page = 0;

/**
 * fetches based off a url and runs CreatePost function with the data
 * @param {string} url 
 */
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
  searchFunc(search.value.toLowerCase(), urls.search);
});
/**
 * sends teh serch value and search url into a searchfetch function
 * @param {string} searchValue 
 * @param {string} searchURL 
 */

const searchFunc = (searchValue, searchURL) => {
  searchFetch(searchValue, searchURL);
};
/**
 * fetches with a privided url and then filters the data
 * @param {string} value 
 * @param {string} url 
 */

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
  console.log(data)
  const searchData = data.filter(
    (e) =>
      e.body?.toLowerCase().includes(value) ||
      e.title?.toLowerCase().includes(value)
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
/**
 * renders out a div with the content provided in data
 * @param {Array} data 
 * @returns 
 */
const createPost = (data) => {
  var {title, body, id} = data;
  return `<div class="post">
			  <h2>${title}</h2>
			  <p>${body}</p>
			  <a href="./singlepost.html?id=${id}">Details</a>
			</div>`;
};

var sorting = document.querySelector("#sorting")

sorting.addEventListener("change", (e) => {
  console.log(e.target.value)
  if (e.target.value == "desc") {
    sortFunc(urls.search, e.target.value)

  }
  if (e.target.value == "asc" ) {
    sortFunc(urls.search, e.target.value)
    
  }
})
/**
 * uses the provided url and sort value to sort the content from either newest to oldest or oldest to newest
 * then runs a rendering functions at the end for each of them
 * @param {string} url 
 * @param {string} sortValue 
 */

const sortFunc = async (url, sortValue) => {
  const token = localStorage.getItem("token");
  const res = await fetch(url + "?sort=created" + "&sortOrder=" + sortValue, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data)
  var main = document.querySelector("#posts");
  main.innerHTML = "";
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += createPost(data[i]);
  }
  main.innerHTML = html;

}

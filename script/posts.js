import { urls } from "./module.mjs";
let notfind = document.querySelector("#notfind");
let page = 0;
let sortValue = "desc"

/**
 * fetches based off a url and runs CreatePost function with the data
 * @param {string} url 
 */
const getPosts = async (url) => {
  let offset = page * 10;
  const token = localStorage.getItem("token");
  const res = await fetch(url + "&offset=" + offset + "&sort=created" + "&sortOrder=" + sortValue, {
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


getPosts(urls.posts(10));

const morePosts = document.querySelector("#more");
morePosts.addEventListener("click", (e) => {
  e.preventDefault();
  page++;
  console.log(page)
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
    let main = document.querySelector("#posts");
    main.innerHTML = "";
    let html = "";
    for (let i = 0; i < searchData.length; i++) {
      html += createPost(searchData[i]);
    }
    main.innerHTML = html;
    
  };

  };

/*
function filter() {
  let tag = document.querySelector("#tag-search").value;
  let active = document.querySelector("#active-check").checked;
  let url = urls.posts;
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
  let {title, body, id, author, media} = data;
  if (!media) {
    return`<div class="post">
    <h2>${title}</h2>
    <p>${body}</p>
    <a href="./singlepost.html?id=${id}">Details</a>
    <a href="./author.html?author=${author.name}">${author.name}</a>
  </div>`;
  } else {
    return`<div class="post">
    <h2>${title}</h2>
    <div class="image">
       <img src="${media}" alt="${title}">
    </div>
    <p>${body}</p>
    <a href="./singlepost.html?id=${id}">Details</a>
    <a href="./author.html?author=${author.name}">${author.name}</a>
  </div>`;
  }
  };


let sorting = document.querySelector("#sorting")

sorting.addEventListener("change", (e) => {
  if (e.target.value == "desc") {
    sortValue = "desc";
    page = 0;
    getPosts(urls.posts(10));
    
    
  }
  if (e.target.value == "asc" ) {
    sortValue = "asc";
    page = 0
    getPosts(urls.posts(10));
    
  }
})

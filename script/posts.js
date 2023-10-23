import { urls } from "./module.mjs";
let notfind = document.querySelector("#notfind");
let page = 0;
let sortValue = "desc"

const user = localStorage.getItem("author");
let yourPosts = document.querySelector("#your-posts");
yourPosts.innerHTML = `<a class="btn btn-primary" href="./author.html?author=${user}"">Your posts</a>`;

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
 * Gives an error if it can't find the search value
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


/**
 * renders out a div with the content provided in data
 * checks for if there's meddia or body and creates different divs accordingly
 * @param {Array} data 
 * @returns 
 */
const createPost = (data) => {
  let {title, body, id, author, media} = data;
  if (!media && !body) {
    return`<div class="post card">
    <div class="card-body">
    <h2 class="card-title">${title}</h2>
    <a href="./singlepost.html?id=${id}" class="btn btn-primary">Details</a>
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
  <a href="./singlepost.html?id=${id}" class="btn btn-primary">Details</a>
  <a href="./author.html?author=${author.name}" class="btn btn-outline-primary">${author.name}</a>
  </div>
</div>`;
}else if (!media) {
  return`<div class="post card">
  <div class="card-body">
  <h2 class="card-title">${title}</h2>
  <p class="card-text">${body}</p>
  <a href="./singlepost.html?id=${id}" class="btn btn-primary">Details</a>
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
  <a href="./singlepost.html?id=${id}" class="btn btn-primary">Details</a>
  <a href="./author.html?author=${author.name}" class="btn btn-outline-primary">${author.name}</a>
  </div>
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

const BASE_URL = "https://api.noroff.dev/api/v1/";

export const urls = {
    login: BASE_URL + "social/auth/login",
    register: BASE_URL + "social/auth/register",
    post: (id) => BASE_URL + `social/posts/${id}?_author=true&_comments=true&_reactions=true`,
    delete: (id) => BASE_URL + `social/posts/${id}`,
    posts: (amount) => BASE_URL + `social/posts?limit=${amount}&_author=true&_comments=true&_reactions=true`,
    createPost: BASE_URL + "social/posts",
    editPost: (id) => BASE_URL + `social/posts/${id}`,
    search: BASE_URL + "social/posts?_author=true&_comments=true&_reactions=true",
    singleProfile: (name) => BASE_URL + `/social/profiles/${name}/posts?_author=true&_comments=true&_reactions=true`,
    allprofiles: BASE_URL + "/social/profiles?_author=true&_comments=true&_reactions=true"
  };

  
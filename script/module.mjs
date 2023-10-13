const BASE_URL = "https://api.noroff.dev/api/v1/";

export const urls = {
    login: BASE_URL + "social/auth/login",
    register: BASE_URL + "social/auth/register",
    post: (id) => BASE_URL + `social/posts/${id}`,
    delete: (id) => BASE_URL + `social/posts/${id}`,
    posts: (amount) => BASE_URL + `social/posts?limit=${amount}&_author=true&_comments=true&_reactions=true`,
    createPost: BASE_URL + "social/posts",
    editPost: (id) => BASE_URL + `social/posts/${id}`,
    search: BASE_URL + "social/posts",
  }

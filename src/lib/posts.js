import { posts } from "@/database/postdb";

export const getPosts = () => {
  return posts;
};

export const createPost = (newPost) => {
  newPost.id === posts.length + 1;
  posts.unshift(newPost);
  console.log(posts);
  return { success: true, message: "Post added successfully" };
};

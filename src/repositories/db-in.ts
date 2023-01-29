import { BlogViewModel, PostViewModel } from "../types";

export let db: { blogs: BlogViewModel[]; posts: PostViewModel[] } = {
  blogs: [],
  posts: [],
};

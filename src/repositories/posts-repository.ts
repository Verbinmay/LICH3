import { PostViewModel } from "../types";
import { blogsRepository } from "./blogs-repository";
import { db } from "./db-local";

export const postsRepository = {
  async findPosts() {
    return db.posts;
  },
  async createPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<PostViewModel> {
    let isId: string = "";
    if (db.posts.length === 0) {
      isId = "0";
    } else if (db.posts.length === 1) {
      if (db.posts[0].id !== "0") {
        isId = "0";
      } else {
        isId = "1";
      }
    } else {
      for (let i = 1; i < db.posts.length; i++) {
        let elementTwo = db.posts[i - 1];
        let idTwo = Number(elementTwo.id);
        let elementOne = db.posts[i];
        let idOne = Number(elementOne.id);
        let raznitsaId = idOne - idTwo;
        if (raznitsaId !== 1) {
          isId = String(idOne + 1);
          break;
        }
        if (i === db.posts.length - 1) {
          isId = String(idOne + 1);
          break;
        }
      }
    }
    let isBlogName: string = "";
    let aabb = await blogsRepository.findBlogById(blogId);
    if (aabb) {
      isBlogName = aabb.name;
    }

    let isCreateAt: string = "";
    var today = new Date();
    isCreateAt = today.toISOString();

    const createPost: PostViewModel = {
      id: isId,
      title: title,
      shortDescription: shortDescription,
      content: content,
      blogId: blogId,
      blogName: isBlogName,
      createdAt: isCreateAt,
    };
    db.posts.push(createPost);
    return createPost;
  },

  async findPostById(id: string): Promise<PostViewModel | null> {
    let onePost = db.posts.find((p) => p.id === id);
    if (onePost) {
      return onePost;
    } else {
      return null;
    }
  },
  async updatePost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ) : Promise <boolean>{
    let bbcc = await postsRepository.findPostById(id);
    if (bbcc) {
      let isBlogName: string = "";
      let aabb = await blogsRepository.findBlogById(blogId);
      if (aabb) {
        isBlogName = aabb.name;
      }
      bbcc.title = title;
      bbcc.shortDescription = shortDescription;
      bbcc.content = content;
      bbcc.blogId = blogId;
      bbcc.blogName = isBlogName;
      return true;
    } else {
      return false;
    }
  },
  async deletePost(id: string): Promise <boolean> {
    let onePost = db.posts.find((p) => p.id === id);
    if (onePost !== undefined) {
      db.posts = db.posts.filter((p) => p.id !== id);
      return true;
    } else {
      return false;
    }
  },
};

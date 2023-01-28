import { BlogViewModel } from "../types";
import { db } from "./db-local";

export const blogsRepository = {
  async findBlogs(): Promise<BlogViewModel[]> {
    return db.blogs;
  },
  async createBlog(
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<BlogViewModel> {
    let isId: string = "";
    if (db.blogs.length === 0) {
      isId = "0";
    } else if (db.blogs.length === 1) {
      if (db.blogs[0].id !== "0") {
        isId = "0";
      } else {
        isId = "1";
      }
    } else {
      for (let i = 1; i < db.blogs.length; i++) {
        let elementTwo = db.blogs[i - 1];
        let idTwo = Number(elementTwo.id);
        let elementOne = db.blogs[i];
        let idOne = Number(elementOne.id);
        let raznitsaId = idOne - idTwo;
        if (raznitsaId !== 1) {
          isId = String(idOne + 1);
          break;
        }
        if (i === db.blogs.length - 1) {
          isId = String(idOne + 1);
          break;
        }
      }
    }

    let isWebsiteUrl: string = "";
    isWebsiteUrl = websiteUrl;

    let isCreateAt: string = "";
    var today = new Date();
    isCreateAt = today.toISOString();

    const createBlog: BlogViewModel = {
      id: isId,
      name: name,
      description: description,
      websiteUrl: isWebsiteUrl,
      createdAt: isCreateAt,
    };
    db.blogs.push(createBlog);
    return createBlog;
  },
  async findBlogById(id: string): Promise<BlogViewModel | undefined> {
    let oneBlog = db.blogs.find((p) => p.id === id);
    return oneBlog;
  },
  async updateBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    let ddff = db.blogs.find((p) => p.id === id);
    if (ddff) {
      ddff.name = name;
      ddff.description = description;
      ddff.websiteUrl = websiteUrl;
      return true;
    } else {
      return false;
    }
  },
  async deleteblogs(id: string): Promise<boolean>  {
    let oneBlog = db.blogs.find((p) => p.id === id);
    if (oneBlog !== undefined) {
      db.blogs = db.blogs.filter((p) => p.id !== id);
      return true ;
    } else {
      return false;
    }
  },
};

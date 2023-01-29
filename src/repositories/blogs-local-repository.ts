import { BlogViewModel } from "../types";
import { blogsCollections } from "./db";

export const blogsRepository = {
  async findBlogs(): Promise<BlogViewModel[]> {
    return await blogsCollections
      .find({}, { projection: { _id: 0 } })
      .toArray();
  },
  async createBlog(
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<BlogViewModel> {
    let isId: string = "";
    let schetchik = false;
    let i = 0;
    do {
      i++;
      let findIdPost = await blogsCollections.findOne({ id: String(i) });
      if (!findIdPost) {
        isId = String(i);
        schetchik = true;
      }
    } while (schetchik === false);

    let isWebsiteUrl: string = websiteUrl;

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
    await blogsCollections.insertOne(createBlog);
    const result = await blogsCollections.findOne(
      { id: isId },
      { projection: { _id: 0 } }
    );
    if (result) {
      return result;
    } else {
      return createBlog;
    }
  },
  async findBlogById(id: string): Promise<BlogViewModel | null> {
    let oneBlog = await blogsCollections.findOne({ id: id },{ projection: { _id: 0 } });
    if (oneBlog) {
      return oneBlog;
    } else {
      return null;
    }
  },
  async updateBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    const result = await blogsCollections.updateOne(
      { id: id },
      {
        $set: {
          name: name,
          description: description,
          websiteUrl: websiteUrl,
        },
      }
    );
    return result.matchedCount === 1;
  },
  async deleteBlog(id: string): Promise<boolean> {
    const result = await blogsCollections.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
};

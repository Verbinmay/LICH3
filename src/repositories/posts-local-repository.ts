import { PostViewModel } from "../types";
import { blogsRepository } from "./blogs-repository";
import { postsCollections } from "./db";

export const postsRepository = {
  async findPosts() {
    return await postsCollections.find({}).toArray();
  },
  async createPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<PostViewModel> {
    let isId: string = "";
    let schetchik = false;
    let i = 0;
    do {
      i++;
      let findIdPost = await postsCollections.findOne({ id: String(i) });
      if (!findIdPost) {
        isId = String(i);
        schetchik = true;
      }
    } while (schetchik === false);

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
    const result = await postsCollections.insertOne(createPost);
    return createPost;
  },

  async findPostById(id: string): Promise<PostViewModel | null> {
    let onePost = await postsCollections.findOne({ id: id });

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
  ): Promise<boolean> {
    let isBlogName: string = "";
    let aabb = await blogsRepository.findBlogById(blogId);
    if (aabb) {
      isBlogName = aabb.name;
    }
    const result = await postsCollections.updateOne(
      { id: id },
      {
        $set: {
          title: title,
          shortDescription: shortDescription,
          content: content,
          blogId: blogId,
          blogName: isBlogName,
        },
      }
    );

    return result.matchedCount === 1;
  },
  async deletePost(id: string): Promise<boolean> {
    const result = await postsCollections.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
};

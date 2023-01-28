
export const postsRepository = {
    findPosts() {
      return db.posts;
    },
    createPost(
      title: string,
      shortDescription: string,
      content: string,
      blogId: string
    ) {
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
      let aabb = blogsRepository.findBlogById(blogId)?.name;
      if (aabb !== undefined) {
        isBlogName = aabb;
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
        createAt:isCreateAt,
      };
      db.posts.push(createPost);
      return createPost;
    },
  
    findPostById(id: string) {
      let onePost = db.posts.find((p) => p.id === id);
      return onePost;
    },
    updatePost(
      bbcc: PostViewModel,
      title: string,
      shortDescription: string,
      content: string,
      blogId: string
    ) {
      let isBlogName: string = "";
      let aabb = blogsRepository.findBlogById(blogId)?.name;
      if (aabb !== undefined) {
        isBlogName = aabb;
      }
      bbcc.title = title;
      bbcc.shortDescription = shortDescription;
      bbcc.content = content;
      bbcc.blogId = blogId;
      bbcc.blogName = isBlogName;
      
    },
    deletePost(id: string) {
      let onePost = db.posts.find((p) => p.id === id);
      if (onePost!==undefined) {
        db.posts = db.posts.filter((p) => p.id !== id);
        return [204];
      } else {
        return [404];
      }
    },
  };
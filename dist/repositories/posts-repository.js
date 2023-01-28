"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
exports.postsRepository = {
    findPosts() {
        return db.posts;
    },
    createPost(title, shortDescription, content, blogId) {
        var _a;
        let isId = "";
        if (db.posts.length === 0) {
            isId = "0";
        }
        else if (db.posts.length === 1) {
            if (db.posts[0].id !== "0") {
                isId = "0";
            }
            else {
                isId = "1";
            }
        }
        else {
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
        let isBlogName = "";
        let aabb = (_a = blogsRepository.findBlogById(blogId)) === null || _a === void 0 ? void 0 : _a.name;
        if (aabb !== undefined) {
            isBlogName = aabb;
        }
        let isCreateAt = "";
        var today = new Date();
        isCreateAt = today.toISOString();
        const createPost = {
            id: isId,
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: isBlogName,
            createAt: isCreateAt,
        };
        db.posts.push(createPost);
        return createPost;
    },
    findPostById(id) {
        let onePost = db.posts.find((p) => p.id === id);
        return onePost;
    },
    updatePost(bbcc, title, shortDescription, content, blogId) {
        var _a;
        let isBlogName = "";
        let aabb = (_a = blogsRepository.findBlogById(blogId)) === null || _a === void 0 ? void 0 : _a.name;
        if (aabb !== undefined) {
            isBlogName = aabb;
        }
        bbcc.title = title;
        bbcc.shortDescription = shortDescription;
        bbcc.content = content;
        bbcc.blogId = blogId;
        bbcc.blogName = isBlogName;
    },
    deletePost(id) {
        let onePost = db.posts.find((p) => p.id === id);
        if (onePost !== undefined) {
            db.posts = db.posts.filter((p) => p.id !== id);
            return [204];
        }
        else {
            return [404];
        }
    },
};

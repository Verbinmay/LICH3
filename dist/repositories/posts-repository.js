"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const blogs_repository_1 = require("./blogs-repository");
const db_in_1 = require("./db-in");
exports.postsRepository = {
    findPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_in_1.db.posts;
        });
    },
    createPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            let isId = "";
            if (db_in_1.db.posts.length === 0) {
                isId = "0";
            }
            else if (db_in_1.db.posts.length === 1) {
                if (db_in_1.db.posts[0].id !== "0") {
                    isId = "0";
                }
                else {
                    isId = "1";
                }
            }
            else {
                for (let i = 1; i < db_in_1.db.posts.length; i++) {
                    let elementTwo = db_in_1.db.posts[i - 1];
                    let idTwo = Number(elementTwo.id);
                    let elementOne = db_in_1.db.posts[i];
                    let idOne = Number(elementOne.id);
                    let raznitsaId = idOne - idTwo;
                    if (raznitsaId !== 1) {
                        isId = String(idOne + 1);
                        break;
                    }
                    if (i === db_in_1.db.posts.length - 1) {
                        isId = String(idOne + 1);
                        break;
                    }
                }
            }
            let isBlogName = "";
            let aabb = yield blogs_repository_1.blogsRepository.findBlogById(blogId);
            if (aabb) {
                isBlogName = aabb.name;
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
                createdAt: isCreateAt,
            };
            db_in_1.db.posts.push(createPost);
            return createPost;
        });
    },
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let onePost = db_in_1.db.posts.find((p) => p.id === id);
            if (onePost) {
                return onePost;
            }
            else {
                return null;
            }
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            let bbcc = yield exports.postsRepository.findPostById(id);
            if (bbcc) {
                let isBlogName = "";
                let aabb = yield blogs_repository_1.blogsRepository.findBlogById(blogId);
                if (aabb) {
                    isBlogName = aabb.name;
                }
                bbcc.title = title;
                bbcc.shortDescription = shortDescription;
                bbcc.content = content;
                bbcc.blogId = blogId;
                bbcc.blogName = isBlogName;
                return true;
            }
            else {
                return false;
            }
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let onePost = db_in_1.db.posts.find((p) => p.id === id);
            if (onePost !== undefined) {
                db_in_1.db.posts = db_in_1.db.posts.filter((p) => p.id !== id);
                return true;
            }
            else {
                return false;
            }
        });
    },
};

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
exports.blogsRepository = void 0;
const db_local_1 = require("./db-local");
exports.blogsRepository = {
    findBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_local_1.db.blogs;
        });
    },
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let isId = "";
            if (db_local_1.db.blogs.length === 0) {
                isId = "0";
            }
            else if (db_local_1.db.blogs.length === 1) {
                if (db_local_1.db.blogs[0].id !== "0") {
                    isId = "0";
                }
                else {
                    isId = "1";
                }
            }
            else {
                for (let i = 1; i < db_local_1.db.blogs.length; i++) {
                    let elementTwo = db_local_1.db.blogs[i - 1];
                    let idTwo = Number(elementTwo.id);
                    let elementOne = db_local_1.db.blogs[i];
                    let idOne = Number(elementOne.id);
                    let raznitsaId = idOne - idTwo;
                    if (raznitsaId !== 1) {
                        isId = String(idOne + 1);
                        break;
                    }
                    if (i === db_local_1.db.blogs.length - 1) {
                        isId = String(idOne + 1);
                        break;
                    }
                }
            }
            let isWebsiteUrl = "";
            isWebsiteUrl = websiteUrl;
            let isCreateAt = "";
            var today = new Date();
            isCreateAt = today.toISOString();
            const createBlog = {
                id: isId,
                name: name,
                description: description,
                websiteUrl: isWebsiteUrl,
                createdAt: isCreateAt,
            };
            db_local_1.db.blogs.push(createBlog);
            return createBlog;
        });
    },
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let oneBlog = db_local_1.db.blogs.find((p) => p.id === id);
            if (oneBlog) {
                return oneBlog;
            }
            else {
                return null;
            }
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let ddff = db_local_1.db.blogs.find((p) => p.id === id);
            if (ddff) {
                ddff.name = name;
                ddff.description = description;
                ddff.websiteUrl = websiteUrl;
                return true;
            }
            else {
                return false;
            }
        });
    },
    deleteblogs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let oneBlog = db_local_1.db.blogs.find((p) => p.id === id);
            if (oneBlog !== undefined) {
                db_local_1.db.blogs = db_local_1.db.blogs.filter((p) => p.id !== id);
                return true;
            }
            else {
                return false;
            }
        });
    },
};

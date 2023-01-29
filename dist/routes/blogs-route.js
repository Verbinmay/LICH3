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
exports.blogsRouter = void 0;
const express_1 = require("express");
const avtorization_middleware_1 = require("../middlewares/avtorization-middleware");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const blogs_repository_1 = require("../repositories/blogs-repository");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let foundBlogs = yield blogs_repository_1.blogsRepository.findBlogs();
    res.status(200).json(foundBlogs);
}));
exports.blogsRouter.post("/", avtorization_middleware_1.avtorizationValidationMiddleware, input_validation_middleware_1.websiteUrlValidation, input_validation_middleware_1.nameValidation, input_validation_middleware_1.descriptionValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let creatorsReturn = yield blogs_repository_1.blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).json(creatorsReturn);
}));
exports.blogsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let oneBlog = yield blogs_repository_1.blogsRepository.findBlogById(req.params.id);
    if (oneBlog) {
        res.status(200).json(oneBlog);
    }
    else {
        res.send(404);
    }
}));
exports.blogsRouter.put("/:id", avtorization_middleware_1.avtorizationValidationMiddleware, input_validation_middleware_1.websiteUrlValidation, input_validation_middleware_1.nameValidation, input_validation_middleware_1.descriptionValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isUpdated = yield blogs_repository_1.blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.blogsRouter.delete("/:id", avtorization_middleware_1.avtorizationValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deletesReturn = yield blogs_repository_1.blogsRepository.deleteblogs(req.params.id);
    if (deletesReturn) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));

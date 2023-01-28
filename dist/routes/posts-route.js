"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get("/", (req, res) => {
    let foundPosts = postsRepository.findPosts();
    res.status(200).json(foundPosts);
});
exports.postsRouter.post("/", avtorizationValidationMiddleware, shortDescriptionValidation, titleValidation, contentValidation, isBlogIdValidation, inputValidationMiddleware, (req, res) => {
    const creatersReturn = postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    res.status(201).json(creatersReturn);
});
exports.postsRouter.get("/:id", (req, res) => {
    let onePost = postsRepository.findPostById(req.params.id);
    if (onePost !== undefined) {
        res.status(200).json(onePost);
    }
    else {
        res.send(404);
    }
});
exports.postsRouter.put("/:id", avtorizationValidationMiddleware, shortDescriptionValidation, titleValidation, contentValidation, isBlogIdValidation, inputValidationMiddleware, (req, res) => {
    let bbcc = postsRepository.findPostById(req.params.id);
    if (bbcc !== undefined) {
        postsRepository.updatePost(bbcc, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.postsRouter.delete("/:id", avtorizationValidationMiddleware, (req, res) => {
    let deletesReturn = postsRepository.deletePost(req.params.id);
    if (deletesReturn[0] === 204) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});

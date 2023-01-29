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
exports.postsRouter = void 0;
const express_1 = require("express");
const avtorization_middleware_1 = require("../middlewares/avtorization-middleware");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const posts_repository_1 = require("../repositories/posts-repository");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let foundPosts = yield posts_repository_1.postsRepository.findPosts();
    res.status(200).json(foundPosts);
}));
exports.postsRouter.post("/", avtorization_middleware_1.avtorizationValidationMiddleware, input_validation_middleware_1.shortDescriptionValidation, input_validation_middleware_1.titleValidation, input_validation_middleware_1.contentValidation, input_validation_middleware_1.isBlogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const creatersReturn = yield posts_repository_1.postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    res.status(201).json(creatersReturn);
}));
exports.postsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let onePost = yield posts_repository_1.postsRepository.findPostById(req.params.id);
    if (onePost) {
        res.status(200).json(onePost);
    }
    else {
        res.send(404);
    }
}));
exports.postsRouter.put("/:id", avtorization_middleware_1.avtorizationValidationMiddleware, input_validation_middleware_1.shortDescriptionValidation, input_validation_middleware_1.titleValidation, input_validation_middleware_1.contentValidation, input_validation_middleware_1.isBlogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let bbcc = yield posts_repository_1.postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (bbcc) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.postsRouter.delete("/:id", avtorization_middleware_1.avtorizationValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deletesReturn = yield posts_repository_1.postsRepository.deletePost(req.params.id);
    if (deletesReturn) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));

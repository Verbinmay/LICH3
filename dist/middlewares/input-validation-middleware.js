"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = exports.websiteUrlValidation = exports.descriptionValidation = exports.nameValidation = exports.isBlogIdValidation = exports.contentValidation = exports.shortDescriptionValidation = exports.titleValidation = void 0;
const express_validator_1 = require("express-validator");
const db_local_1 = require("../repositories/db-local");
exports.titleValidation = (0, express_validator_1.body)("title")
    .isString()
    .withMessage("Title isnt string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Title is empty")
    .bail()
    .isLength({ max: 30 })
    .withMessage("Title length must be max 30");
exports.shortDescriptionValidation = (0, express_validator_1.body)("shortDescription")
    .isString()
    .withMessage("ShortDescription isnt string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("ShortDescription is empty")
    .bail()
    .isLength({ max: 100 })
    .withMessage("shortDescription length must be max 100");
exports.contentValidation = (0, express_validator_1.body)("content")
    .isString()
    .withMessage("content isnt string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("content is empty")
    .bail()
    .isLength({ max: 1000 })
    .withMessage("content length must be max 1000");
exports.isBlogIdValidation = (0, express_validator_1.body)("blogId").custom((value) => {
    let foundBlog = db_local_1.db.blogs.find((p) => p.id === value);
    if (!foundBlog) {
        throw new Error("Please insert existed user id");
    }
    return true;
});
exports.nameValidation = (0, express_validator_1.body)("name")
    .isString()
    .withMessage("Not name")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name is empty")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Names length must be max 15");
exports.descriptionValidation = (0, express_validator_1.body)("description")
    .isString()
    .withMessage("Isnt string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Description is empty")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Description length must be max 500");
exports.websiteUrlValidation = (0, express_validator_1.body)("websiteUrl")
    .isURL()
    .withMessage("Isnt URL")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("WebsiteURL is empty")
    .bail()
    .isLength({ max: 100 })
    .withMessage("WebsiteUrl ength must be max 100");
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let newErorsArray = errors.array().map(function (a) {
            return {
                message: a.msg,
                field: a.param,
            };
        });
        res.status(400).json({ errorsMessages: newErorsArray });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;

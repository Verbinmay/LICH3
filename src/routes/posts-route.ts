import { Request, Response, Router } from "express";
import { avtorizationValidationMiddleware } from "../middlewares/avtorization-middleware";
import { shortDescriptionValidation, titleValidation, contentValidation, isBlogIdValidation, inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { postsRepository } from "../repositories/posts-repository";
import { PostInputModel } from "../types";

export const postsRouter = Router({});

postsRouter.get("/", async (req: Request, res: Response) => {
    let foundPosts = await postsRepository.findPosts();
    res.status(200).json(foundPosts);
  });
  
  postsRouter.post(
    "/",
    avtorizationValidationMiddleware,
    shortDescriptionValidation,
    titleValidation,
    contentValidation,
    isBlogIdValidation,
    inputValidationMiddleware,
    async (req: Request<{}, {}, PostInputModel>, res: Response) => {
      const creatersReturn = await postsRepository.createPost(
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId
      );
      res.status(201).json(creatersReturn);
    }
  );
  
  postsRouter.get("/:id",async (req: Request, res: Response) => {
    let onePost = await postsRepository.findPostById(req.params.id);
    if (onePost) {
      res.status(200).json(onePost);
    } else {
      res.send(404);
    }
  });
  
  postsRouter.put(
    "/:id",
    avtorizationValidationMiddleware,
    shortDescriptionValidation,
    titleValidation,
    contentValidation,
    isBlogIdValidation,
    inputValidationMiddleware,
    async (req: Request<{ id: string }, {}, PostInputModel>, res: Response) => {
      let bbcc = await postsRepository.updatePost(
        req.params.id,
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId)

      if (bbcc) {
        res.send(204);
      } else {
        res.send(404);
      }
    }
  );
  
  postsRouter.delete(
    "/:id",
    avtorizationValidationMiddleware,
    async (req: Request, res: Response) => {
      let deletesReturn = await  postsRepository.deletePost(req.params.id);
      if (deletesReturn) {
        res.send(204);
      } else {
        res.send(404);
      }
    }
  );



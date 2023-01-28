import { Request, Response, Router } from "express";

export const postsRouter = Router({});

postsRouter.get("/", (req: Request, res: Response) => {
    let foundPosts = postsRepository.findPosts();
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
    (req: Request<{}, {}, PostInputModel>, res: Response) => {
      const creatersReturn = postsRepository.createPost(
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId
      );
      res.status(201).json(creatersReturn);
    }
  );
  
  postsRouter.get("/:id", (req: Request, res: Response) => {
    let onePost = postsRepository.findPostById(req.params.id);
    if (onePost !== undefined) {
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
    (req: Request<{ id: string }, {}, PostInputModel>, res: Response) => {
      let bbcc = postsRepository.findPostById(req.params.id);
      if (bbcc !== undefined) {
        postsRepository.updatePost(
          bbcc,
          req.body.title,
          req.body.shortDescription,
          req.body.content,
          req.body.blogId
        );
        res.send(204);
      } else {
        res.send(404);
      }
    }
  );
  
  postsRouter.delete(
    "/:id",
    avtorizationValidationMiddleware,
    (req: Request, res: Response) => {
      let deletesReturn = postsRepository.deletePost(req.params.id);
      if (deletesReturn[0] === 204) {
        res.send(204);
      } else {
        res.send(404);
      }
    }
  );



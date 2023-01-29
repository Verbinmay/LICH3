import { Request, Response, Router } from "express";
import { avtorizationValidationMiddleware } from "../middlewares/avtorization-middleware";
import { websiteUrlValidation, nameValidation, descriptionValidation, inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { blogsRepository } from "../repositories/blogs-local-repository";
import { BlogInputModel, BlogViewModel } from "../types";


export const blogsRouter = Router({});


blogsRouter.get("/",async (req: Request, res: Response) => {
    let foundBlogs:BlogViewModel[] = await blogsRepository.findBlogs();
    res.status(200).json(foundBlogs);
  });
  
  blogsRouter.post(
    "/", 
    avtorizationValidationMiddleware,
    websiteUrlValidation,
    nameValidation,
    descriptionValidation,
    inputValidationMiddleware,
    async (req: Request<{}, {}, BlogInputModel>, res: Response) => {
      let creatorsReturn: BlogViewModel  = await blogsRepository.createBlog(
        req.body.name,
        req.body.description,
        req.body.websiteUrl
      );
      res.status(201).json(creatorsReturn);
    }
  );
  
  blogsRouter.get("/:id", async (req: Request, res: Response) => {
    let oneBlog = await blogsRepository.findBlogById(req.params.id);
    if (oneBlog) {
      res.status(200).json(oneBlog);
    } else {
      res.send(404);
    }
  });
  
  blogsRouter.put(
    "/:id",
    avtorizationValidationMiddleware,
    websiteUrlValidation,
    nameValidation,
    descriptionValidation,
    inputValidationMiddleware,
    async (req: Request<{ id: string }, {}, BlogInputModel>, res: Response) => {
     let isUpdated =  await blogsRepository.updateBlog(
        req.params.id,
        req.body.name,
        req.body.description,
        req.body.websiteUrl
      )
      if (isUpdated) {
        res.send(204);
      } else {
        res.send(404);
      }
    }
  );
  
  blogsRouter.delete(
    "/:id",
    avtorizationValidationMiddleware,
    async (req: Request, res: Response) => {
      let deletesReturn = await blogsRepository.deleteBlog(req.params.id);
      if (deletesReturn) {
        res.send(204);
      } else {
        res.send(404);
      }
    }
  );

import express,{Request, Response} from 'express'
import bodyParser from "body-parser"; 
const app = express()
const port = process.env.PORT || 3000;

const jsonBodyMiddleware = bodyParser.json()
app.use (jsonBodyMiddleware)

app.use('/blogs', blogsRouter) 
app.use('/posts', postsRouter) 

app.delete("/testing/all-data", (req: Request, res: Response) => {
  db.posts = [];
  db.blogs = [];
  res.send(204);
});

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log("Example app listening on port: ${port}");
  });
};

startApp();
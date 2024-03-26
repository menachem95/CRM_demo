import express, { Request, Response, NextFunction } from "express";
// import cors from "cors";
import apiRouter from "./old_code_mySql2/routes";
import newApiRouter from "./routes"

const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS as string

const app = express();

app.use(express.json());

app.use((req, res, next) => {
//  res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE",
    
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
res.header('Access-Control-Allow-Origin', CLIENT_ADDRESS); // אפשר גישה מכל מקור
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
res.header('Access-Control-Allow-Credentials', 'true');
if (req.method === 'OPTIONS') {
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  return res.status(200).json({});
}
next();
});

// app.use("/api", apiRouter);
app.use("/api", newApiRouter)




app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

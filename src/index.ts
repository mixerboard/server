import express, { ErrorRequestHandler } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

dotenv.config();

const app = express();

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  res.status(500).send("Server error.");
  next(err);
};

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use("/", routes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

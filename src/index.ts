import express from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

app.use("/", routes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

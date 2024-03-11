import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes";
import { errorHandler } from "./middlewares/error-handler";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

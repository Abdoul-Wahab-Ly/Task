import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import errorHandler from "./utils/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/taskproject/v1/auth/", authRoutes);
app.use("/taskproject/v1/task", taskRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});

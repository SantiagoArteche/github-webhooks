import express from "express";
import { ServerRoutes } from "./routes";
import "dotenv/config";
import { GithubSha256Middleware } from "./middlewares/github-sha256.middleware";

export class Server {
  private readonly app = express();
  private readonly PORT = process.env.PORT;
  constructor() {}

  public start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use("/", ServerRoutes.routes);

    this.app.listen(this.PORT, () => {
      console.log(`Server running on PORT ${this.PORT}`);
    });
  }
}

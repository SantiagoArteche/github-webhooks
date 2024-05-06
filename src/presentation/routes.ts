import { Router } from "express";
import { GithubRoutes } from "./github/routes";

export class ServerRoutes {
  static get routes() {
    const router = Router();
    
    router.use("/api/github", GithubRoutes.router);

    return router;
  }
}

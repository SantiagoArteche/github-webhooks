import { Router } from "express";
import { GithubController } from "./controller";
import { DiscordService } from "../services/discord.service";
import { GithubSha256Middleware } from "../middlewares/github-sha256.middleware";

export class GithubRoutes {
  static get router() {
    const router = Router();

    const discordService = new DiscordService();
    const controller = new GithubController(discordService);

    router.post(
      "/",
      GithubSha256Middleware.verifySignature,
      controller.webhookHandler
    );

    return router;
  }
}

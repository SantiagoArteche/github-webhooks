import { Request, Response } from "express";
import { GithubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";

export class GithubController {
  constructor(private readonly discordService: DiscordService) {}

  webhookHandler = async (req: Request, res: Response) => {
    const githubEvent = req.header("x-github-event") ?? "unknown";
    const payload = req.body;

    let message: string;

    switch (githubEvent) {
      case "star":
        message = GithubService.onStar(payload);
        break;
      case "issues":
        message = GithubService.onIssue(payload);
        break;
      default:
        message = `Unknown event: ${githubEvent}`;
        break;
    }

    this.discordService
      .notify(
        message,
        "https://res.cloudinary.com/santiago-arteche/image/upload/v1711441370/ref4gferevogkjn32oif.jpg"
      )
      .then(() => res.status(202).send("Accepted"))
      .catch((error) => res.status(500).send(error));
  };
}

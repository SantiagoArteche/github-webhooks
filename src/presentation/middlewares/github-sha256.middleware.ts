import { NextFunction, Request, Response } from "express";
import * as crypto from "crypto";

const verify_signature = (req: Request) => {
  try {
    const WEBHOOK_SECRET: string = process.env.SECRET_TOKEN!;

    const xHubSign = req.header("x-hub-signature-256") ?? "";
    const signature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest("hex");
    let trusted = Buffer.from(`sha256=${signature}`, "ascii");
    let untrusted = Buffer.from(xHubSign, "ascii");
    return crypto.timingSafeEqual(trusted, untrusted);
  } catch (error) {
    return false;
  }
};

export class GithubSha256Middleware {
  static verifySignature = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!verify_signature(req)) {
      res.status(401).send("Unauthorized");
      return;
    }

    next();
  };
}

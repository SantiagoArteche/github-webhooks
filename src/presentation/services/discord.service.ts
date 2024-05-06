import "dotenv/config";

export class DiscordService {
  private readonly dsWebhookURL = process.env.DISCORD_WEBHOOK_URL;

  constructor() {}

  async notify(message: string, fileURL?: string) {
    const body = {
      content: message,
      embeds: [
        {
          image: { url: fileURL },
        },
      ],
    };

    const response = await fetch(this.dsWebhookURL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log("Error sending message to discord");
      return false;
    }

    return true;
  }
}

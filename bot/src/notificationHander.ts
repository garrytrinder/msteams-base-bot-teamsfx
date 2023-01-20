import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { conversationBot } from ".";
import notificationTemplate from "./notificationResponse.json";

interface CardData {
  title: string;
  appName: string;
  description: string;
  notificationUrl: string;
}

export const notificationHandler = async (req, res) => {
  for (const target of await conversationBot.notification.installations()) {
    await target.sendAdaptiveCard(
      AdaptiveCards.declare<CardData>(notificationTemplate).render({
        title: "New Event Occurred!",
        appName: "Contoso App Notification",
        description: `This is a sample http-triggered notification to ${target.type}`,
        notificationUrl: "https://www.adaptivecards.io/",
      })
    );
  }

  res.json({});
}

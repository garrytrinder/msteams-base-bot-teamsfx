import { Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import helloWorldCard from "./helloworldCommandResponse.json";

interface CardData {
  title: string;
  body: string;
}

export class HelloWorldCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "helloWorld";

  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage
  ): Promise<string | Partial<Activity> | void> {
    console.log(`Bot received message: ${message.text}`);

    // Render your adaptive card for reply message
    const cardData: CardData = {
      title: "Your Hello World Bot is Running",
      body: "Congratulations! Your hello world bot is running. Click the button below to trigger an action.",
    };

    const cardJson = AdaptiveCards.declare(helloWorldCard).render(cardData);
    return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
  }
}

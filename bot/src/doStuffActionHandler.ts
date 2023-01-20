import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { TurnContext, InvokeResponse } from "botbuilder";
import { TeamsFxAdaptiveCardActionHandler, InvokeResponseFactory } from "@microsoft/teamsfx";
import responseCard from "./doStuffActionResponse.json";

interface CardData {
  title: string;
  body: string;
}

export class DoStuffActionHandler implements TeamsFxAdaptiveCardActionHandler {
  triggerVerb = "doStuff";

  async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse> {
    const cardData: CardData = {
      title: "Hello World Bot",
      body: "Congratulations! Your task is processed successfully.",
    };

    const cardJson = AdaptiveCards.declare(responseCard).render(cardData);
    return InvokeResponseFactory.adaptiveCard(cardJson);
  }
}

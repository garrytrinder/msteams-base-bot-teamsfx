import * as restify from "restify";
import { ConversationBot } from "@microsoft/teamsfx";
import { TeamsActivityHandler } from "botbuilder";

// import your custom action handlers and command handlers
import { DoStuffActionHandler } from "./doStuffActionHandler";
import { HelloWorldCommandHandler } from "./helloworldCommandHandler";
import { notificationHandler } from "./notificationHander";

// teamsfx bot setup
export const conversationBot = new ConversationBot({
  adapterConfig: {
    appId: process.env.BOT_ID,
    appPassword: process.env.BOT_PASSWORD,
  },
  cardAction: {
    enabled: true,
    actions: [new DoStuffActionHandler()],
  },
  command: {
    enabled: true,
    commands: [new HelloWorldCommandHandler()],
  },
  notification: {
    enabled: true,
  }
});

// teams activity handler setup, override methods to handle incoming activities from Teams
class ConversationBotActitivityHandler extends TeamsActivityHandler {
  constructor() {
    super();
  }
}

// create an instance of your activity handler
const conversationBotActitivityHandler = new ConversationBotActitivityHandler();

// web server setup
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\nBot Started, ${server.name} listening to ${server.url}`);
});

// bot framework endpoint to receive incoming activities
server.post("/api/messages", async (req, res) => {
  await conversationBot.adapter.process(req, res, (context) => conversationBotActitivityHandler.run(context))
});

// notification endpoint to trigger notifications to Teams
server.post(
  "/api/notification",
  restify.plugins.queryParser(),
  restify.plugins.bodyParser(), // Add more parsers if needed
  notificationHandler
);

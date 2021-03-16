import * as AWS from "aws-sdk";
import useConfig from "./useConfig";
const useLex = ({ username }) => {
  const lexConfig = useConfig().lex;
  function pushChat(text, callback) {
    if (!username) {
      return;
    }
    const lexruntime = new AWS.LexRuntime();

    // send it to the Lex runtime
    const params = {
      botAlias: lexConfig.botAlias,
      botName: lexConfig.botName,
      inputText: text,
      userId: username,
      sessionAttributes: window.sessionAttributes,
    };

    lexruntime.postText(params, function (err, data) {
      if (err) {
        // console.log(err);
        window.sessionAttributes = {};
        callback("error");
        return;
      }
      if (data) {
        window.sessionAttributes = data.sessionAttributes;
        // capture the sessionAttributes for the next cycle
        // show response and/or error/dialog status
        const filteredMessage = data.message.replace(/(\r\n|\n|\r)/g, "");
        callback(filteredMessage);
      }
    });
  }
  return {
    pushChat,
    botName: lexConfig.botName,
    botAlias: lexConfig.botAlias,
  };
};

export default useLex;

import React, { useContext, useEffect, useRef, useState } from "react";

import { AppContext } from "../../AppContext";

import InputSuggestion from "../InputSuggestions/InputSuggestions";

const QueryBox = ({ pushChat, username, botName, botAlias, sessionAttributes }) => {
  const textInputRef = useRef();
  const { messages, setMessages, isPreviousMessagesLoaded, setIsWaiting } = useContext(AppContext);
  const [message, setMessage] = useState("");

  const [isStopConversationRequested, setIsStopConversationRequested] = useState(false);
  const [voiceState, setVoiceState] = useState("passive");
  const [isStopConversationButtonVisible, setIsStopConversationButtonVisible] = useState(false);
  const [isSpeakButtonVisible, setIsSpeakButtonVisible] = useState(true);
  const voiceStateInRef = useRef("passive");
  const botResponseErrorRef = useRef(0);

  useEffect(() => {
    const getLastMessage = () => {
      return messages[messages.length - 1];
    };
    const saveBotReply = (botReply) => {
      if (botReply === "error") {
        setMessages([
          ...messages,
          {
            from: "app",
            message: "Your request didn’t get processed, Please go through the below steps",
            type: "error",
          },
        ]);
        return;
      }
      if (isJson(botReply) && !isJsonMessageCorrectFormat(botReply)) {
        setMessages([...messages, { from: "app", message: "Oops something went wrong." }]);
      } else {
        botResponseErrorRef.current = 0;
        setMessages([...messages, { from: "app", message: botReply }]);
        setIsWaiting(false);
      }
    };
    if (hasMessages() && isMessageFromUser() && isPreviousMessagesLoaded) {
      if (messages[messages.length - 1].platform === "voice") {
        // no op
      } else {
        pushChat(messages[messages.length - 1].message, saveBotReply);
      }
    }
    if (hasMessages() && isMessageFromApp(getLastMessage()) && getLastMessage().type === "error") {
      if (!botResponseErrorRef.current) {
        botResponseErrorRef.current += 1;
        pushChat("hi", saveBotReply);
      }
    }
    // eslint-disable-next-line
  }, [messages]);

  // this is to determine whether stopConversationButton should be displayed or not
  // this is to determine whether speakButton should be displayed or not
  useEffect(() => {
    if (voiceState === "passive") {
      setIsSpeakButtonVisible(true);
      setIsStopConversationButtonVisible(false);
    } else {
      setIsSpeakButtonVisible(false);
      setIsStopConversationButtonVisible(true);
    }
  }, [voiceState]);

  // when the stopConversation is requested
  // stopConversation when the state becomes listening or passive
  useEffect(() => {
    if (isStopConversationRequested && (voiceState === "listening" || voiceState === "passive")) {
      conversation.reset();
      setVoiceState("passive");
      setIsStopConversationRequested(false);
    } else {
      // console.log("waiting");
      // no op
    }
    // eslint-disable-next-line
  }, [voiceState, isStopConversationRequested]);

  const config = {
    lexConfig: {
      botName: botName,
      botAlias: botAlias,
      userId: username,
    },
  };

  let conversation;

  try {
    conversation = new window.LexAudio.conversation(
      config,
      function (state) {
        if (state === "Listening") {
          setVoiceState("listening");
          voiceStateInRef.current = "listening";
        }
        if (state === "Sending") {
          voiceStateInRef.current = "sending";
          setVoiceState("sending");
        }
        if (state === "Speaking") {
          voiceStateInRef.current = "speaking";
          setVoiceState("speaking");
        }
        if (state === "Passive") {
          voiceStateInRef.current = "passive";
          setVoiceState("passive");
        }
      },
      function (data) {
        const filteredMessage = data.message.replace(/(\r\n|\n|\r)/g, "");
        setMessages((state) => [
          ...state,
          {
            from: "user",
            message: data.inputTranscript,
            platform: "voice",
          },
          {
            from: "app",
            message: filteredMessage,
          },
        ]);
      },
      function (error) {
        setMessages((state) => [
          ...state,
          { from: "app", message: "Oops! Something went wrong. Please try saying that again." },
        ]);
      },
      function (timeDomain, bufferLength) {
        // console.log(bufferLength);
      }
    );
  } catch (error) {
    setMessages([...messages, { from: "app", message: "Oops! Something went wrong" }]);
  }

  const hasMessages = () => {
    return messages.length > 0 ? true : false;
  };

  const isMessageFromUser = () => {
    return messages[messages.length - 1].from === "user" ? true : false;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (message && message !== "") {
      const userMessage = {
        from: "user",
        message: message,
      };
      setMessages([...messages, userMessage]);
      setMessage("");
      setIsWaiting(true);
    } else {
      return;
    }
  };

  const stopConversationClickHandler = () => {
    setIsStopConversationRequested(true);
  };

  const speakButtonClickHandler = () => {
    if (voiceState === "passive") {
      conversation.advanceConversation();
    } else {
      console.log("speakButton clicked but will be ignored");
    }
  };

  const voiceButtonClass = () => {
    if (voiceState === "passive") {
      return "btn query-box__button query-box__button--voice";
    } else {
      return "btn query-box__button query-box__button--voice";
    }
  };

  const getColumnNames = () => {
    const lastMessageIndex = messages.length - 1;
    const lastMessage = messages[lastMessageIndex];
    if (
      isMessageFromApp(lastMessage) &&
      isJson(lastMessage.message) &&
      hasColumnProperty(getMessageObject(lastMessage.message))
    ) {
      const messageObject = getMessageObject(lastMessage.message);
      return getColumnsArray(messageObject.Column);
    }
    return null;
  };

  const getColumnsArray = (columnsObject) => {
    const columnsArray = [];
    for (let i = 0; i < columnsObject.length; i++) {
      const columnsObjectKey = Object.keys(columnsObject[i]);
      columnsArray.push(columnsObject[i][columnsObjectKey].value);
    }
    return columnsArray;
  };

  const hasColumnProperty = (messageObject) => {
    const messageObjectKeys = Object.keys(messageObject);
    return messageObjectKeys.includes("Column");
  };

  const getMessageObject = (message) => {
    return JSON.parse(message).Result;
  };

  const isJson = (message) => {
    try {
      JSON.parse(message);
    } catch (error) {
      return false;
    }
    return true;
  };

  const isJsonMessageCorrectFormat = (message) => {
    if (!isJson(message)) {
      return false;
    }
    const parsedMessage = JSON.parse(message);
    if (!parsedMessage.Result) {
      console.log("no result property");
      return false;
    }
    if (!parsedMessage.Result.Chart) {
      console.log("no chart property");
      return false;
    }
    if (!parsedMessage.Result.Chart.Aggregation) {
      console.log("no aggregation property");
      return false;
    }
    if (!parsedMessage.Result.Chart.Data) {
      console.log("no data property");
      return false;
    }
    if (!parsedMessage.Result.Button) {
      console.log("no button property");
      return false;
    }
    if (!parsedMessage.Result.Text) {
      console.log("no text property");
      return false;
    }
    return true;
  };

  const isMessageFromApp = (message) => {
    return JSON.stringify(message.from) === JSON.stringify("app") ? true : false;
  };

  const stopConversationButton = isStopConversationButtonVisible ? (
    <button
      onClick={stopConversationClickHandler}
      className={"btn query-box__button"}
      style={{ background: "red", display: "flex", alignItems: "center" }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M6 6h12v12H6z" />
      </svg>
    </button>
  ) : null;

  const isSpeakButtonDisabled = voiceState === "passive" ? false : true;

  const speakButton = isSpeakButtonVisible ? (
    <button onClick={speakButtonClickHandler} className={voiceButtonClass()} disabled={isSpeakButtonDisabled}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
      </svg>
    </button>
  ) : null;

  return (
    <div className="query-box">
      {messages.length > 0 ? (
        <InputSuggestion
          columnNames={getColumnNames()}
          userInput={message}
          setMessage={setMessage}
          textInputRef={textInputRef.current}
        />
      ) : null}
      {voiceState === "listening" ? (
        <div className="query-box__mic-listening-container">
          <div className="query-box__mic-listening-helper">
            <div className="query-box__mic-listening">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="MyGradient">
                    <stop offset="0%" stopColor="rgba(65,77,241,1)" />
                    <stop offset="100%" stopColor="rgba(255,71,71,1)" />
                  </linearGradient>
                </defs>
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path>
              </svg>
              <span className="query-box__mic-listening-text">Listening</span>
            </div>
          </div>
        </div>
      ) : null}
      <form className="query-box__form" onSubmit={(e) => submitHandler(e)}>
        <input
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          type="text"
          className="query-box__input form-control"
          ref={textInputRef}
        />
        <button type="submit" className="btn query-box__button query-box__button--send">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
        {speakButton}
        {stopConversationButton}
      </form>
    </div>
  );
};

export default QueryBox;

import React, { useContext, useEffect, useRef, useState } from "react";

import { AppContext } from "../../AppContext";

import * as AWS from "aws-sdk";

const QueryBox = ({ pushChat, username, botName, botAlias }) => {
  const { messages, setMessages } = useContext(AppContext);
  const [message, setMessage] = useState("");

  const [
    isStopConversationRequested,
    setIsStopConversationRequested,
  ] = useState(false);
  const [voiceState, setVoiceState] = useState("passive");
  const [
    isStopConversationButtonVisible,
    setIsStopConversationButtonVisible,
  ] = useState(false);
  const [isSpeakButtonVisible, setIsSpeakButtonVisible] = useState(true);
  const voiceStateInRef = useRef("passive");

  useEffect(() => {
    // console.log("QueryBox useEffect");
    const saveBotReply = (botReply) => {
      setMessages([...messages, { from: "app", message: botReply }]);
    };
    if (messages.length > 0 && messages[messages.length - 1].from === "user") {
      if (messages[messages.length - 1].platform === "voice") {
        // no op
      } else {
        pushChat(messages[messages.length - 1].message, saveBotReply);
      }
    }
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
    if (
      isStopConversationRequested &&
      (voiceState === "listening" || voiceState === "passive")
    ) {
      conversation.reset();
      setVoiceState("passive");
      setIsStopConversationRequested(false);
    } else {
      // console.log("waiting");
      // no op
    }
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
        console.log(error);
        setMessages([
          ...messages,
          { from: "app", message: "Oops! Something went wrong" },
        ]);
      },
      function (timeDomain, bufferLength) {
        // console.log(bufferLength);
      }
    );
  } catch (error) {
    setMessages([
      ...messages,
      { from: "app", message: "Oops! Something went wrong" },
    ]);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (message && message !== "") {
      const userMessage = {
        from: "user",
        message: message,
      };
      setMessages([...messages, userMessage]);
      setMessage("");
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
    <button
      onClick={speakButtonClickHandler}
      className={voiceButtonClass()}
      disabled={isSpeakButtonDisabled}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
      </svg>
    </button>
  ) : null;

  return (
    <div className="query-box">
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
        />
        <button
          type="submit"
          className="btn query-box__button query-box__button--send"
        >
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

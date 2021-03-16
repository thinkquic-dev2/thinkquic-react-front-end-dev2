import { AppConfig } from "aws-sdk";
import { useEffect, useState } from "react";
import useConfig from "./useConfig";

const useMessages = () => {
  const appConfig = useConfig().app;
  const [messages, setMessages] = useState([]);
  const [isPreviousMessagesLoaded, setIsPreviousMessagesLoaded] = useState(false);

  const retrieveTranscriptFromLocalStorage = () => {
    if (hasConversationInLocalStorage()) {
      return getTranscriptFromLocalStorage();
    } else {
      return getWelcomeMessage();
    }
  };

  const hasConversationInLocalStorage = () => {
    return localStorage.getItem("transcript") ? true : false;
  };

  const getTranscriptFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("transcript"));
  };

  const hasMessages = () => {
    return messages.length > 0 ? true : false;
  };

  const saveTranscriptToLocalStorage = () => {
    localStorage.setItem("transcript", JSON.stringify(messages));
  };

  const getWelcomeMessage = () => {
    const welcomeMessage = [
      {
        from: "app",
        message: appConfig.welcomeMessage,
      },
    ];
    return welcomeMessage;
  };

  // retrieve transcript from localStorage
  // if no transcript in localStorage, add welcome message
  useEffect(() => {
    //console.log(isPreviousMessagesLoaded);
    //console.log(retrieveTranscriptFromLocalStorage());
    if (!isPreviousMessagesLoaded) {
      setMessages([...retrieveTranscriptFromLocalStorage()]);
      setIsPreviousMessagesLoaded(true);
    }
  }, [isPreviousMessagesLoaded]);

  // save each message to transcript
  useEffect(() => {
    if (hasMessages()) {
      saveTranscriptToLocalStorage();
    } else {
      setMessages([...retrieveTranscriptFromLocalStorage()]);
    }
  }, [messages]);

  return {
    messages,
    setMessages,
    isPreviousMessagesLoaded,
  };
};

export default useMessages;

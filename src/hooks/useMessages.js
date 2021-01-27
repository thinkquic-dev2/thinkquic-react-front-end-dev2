import { useState } from "react";

const useMessages = () => {
  const [messages, setMessages] = useState([]);

  return {
    messages,
    setMessages,
  };
};

export default useMessages;

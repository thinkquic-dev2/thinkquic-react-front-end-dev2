import { useContext } from 'react';
import { AppContext } from '../AppContext';
const useAppResponse = () => {
  const { messages, setMessages, uploadedJsonFile } = useContext(AppContext);

  const getAppResponse = () => {
    // check if messages is empty
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

    // check if the last message is from user
    if (lastMessage && lastMessage.from === 'user') {
      const userMessageArr = lastMessage.text.split(" ");
      const chartCommand = userMessageArr[0];
      const fieldToChart = userMessageArr[1];

      // check is user's message is to chart from table
      if (chartCommand.includes('chart') && fieldToChart) {
        if (uploadedJsonFile) {
          console.log(uploadedJsonFile);
          console.log(fieldToChart);
          setMessages([...messages, {
            type: 'data',
            from: 'app',
            text: null,
            data: fieldToChart
          }]);
        } else {
          setMessages([...messages, {
            type: 'text',
            text: 'The field does not exist or there is no file uploaded',
            from: 'app',
            data: null
          }])
        }
      } else if (chartCommand.includes('getrecords')) {
        setMessages([...messages, {
          type: 'text',
          text: 'get records yo',
          from: 'app',
          data: null
        }]);
      } else {
        setMessages([...messages, {
          type: 'text',
          text: lastMessage.text,
          from: 'app',
          data: null
        }]);
      }
    }
  }

  return {
    getAppResponse
  }
}

export default useAppResponse;
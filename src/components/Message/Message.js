import React, { useEffect, useRef, useContext } from "react";

import MessageBubble from "../MessageBubble/MessageBubble";

import TableMessageContainer from "./TableMessage/TableMessageContainer";
import BasicMessageContainer from "./BasicMessage/BasicMessageContainer";
import AggregationMessageContainer from "./AggregationMessage/AggregationMessageContainer";
import OptionsMessageContainer from "./OptionsMessage/OptionsMessageContainer";

import useChartHelper from "../../hooks/useChartHelper";

import DataUi from "./DataUi/DataUi";

import { AppContext } from "../../AppContext";

const Message = ({ message }) => {
  const { setMessages, messages } = useContext(AppContext);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  const renderTextMessage = (message) => {
    return <div>{message.message}</div>;
  };

  const isMessageJson = (message) => {
    try {
      JSON.parse(message);
    } catch (error) {
      return false;
    }
    return true;
  };
  const renderMessage = () => {
    if (message.from === "user") {
      return renderTextMessage(message);
    } else if (message.from === "app") {
      if (isMessageJson(message.message)) {
        return composeMessageFromJson(message);
      } else {
        return renderTextMessage(message);
      }
    }
  };

  const json = {
    Result: {
      Chart: {
        Aggregation: [],
        Data: [
          {
            Doc1: {
              price: "7962500 $",
              area: "6000 sq ft",
              bedrooms: 3,
              bathrooms: 1,
              stories: 4,
              mainroad: "yes",
              guestroom: "yes",
              basement: "no",
              hotwaterheating: "no",
              airconditioning: "yes",
            },
          },
        ],
      },
      Button: [],
      Text: [
        {
          Text1: {
            value: "1) Search for 6000",
          },
        },
      ],
    },
  };

  const composeMessageFromJson = (message) => {
    const jsonResult = JSON.parse(message.message).Result;
    const chartableItems = jsonResult.Chart;
    const aggregations =
      chartableItems.Aggregation || chartableItems.Aggregations;
    const data = chartableItems.Data;
    const buttons = jsonResult.Button;
    const texts = jsonResult.Text;

    const aggregationCharts = (
      <div>
        {aggregations.map((aggregation, index) => {
          return createChartForAggregation(aggregation, index);
        })}
      </div>
    );

    const dataUi = (
      <div>
        {data.map((datum, index) => (
          <DataUi key={"data-" + index} data={datum} />
        ))}
      </div>
    );

    const buttonUis = (
      <div className="d-flex justify-content-center py-4">
        {buttons.map((button, index) => {
          const buttonFirstKey = Object.keys(button);
          return (
            <button
              onClick={() => {
                setMessages([
                  ...messages,
                  { from: "user", message: button[buttonFirstKey].value },
                ]);
              }}
              key={index}
              className="btn btn-success mx-1 mb-2"
            >
              {button[buttonFirstKey].key}
            </button>
          );
        })}
      </div>
    );

    const textDisplay = (
      <div className="py-4">
        {texts.map((text, index) => {
          const textFirstKey = Object.keys(text);
          return <div key={index}>{text[textFirstKey].value}</div>;
        })}
      </div>
    );

    return (
      <div>
        {aggregationCharts}
        {dataUi}
        {textDisplay}
        {buttonUis}
      </div>
    );
  };

  const createChartForAggregation = (aggregation, index) => {
    let aggregationFirstKey;
    aggregationFirstKey = Object.keys(aggregation)[0];
    return (
      <div className="w-100" key={index}>
        <div className="font-weight-bold text-center py-3">
          {aggregation[aggregationFirstKey].statistics.stats_key}
        </div>
        <AggregationMessageContainer
          aggregationData={aggregation[aggregationFirstKey].statistics.stats}
          aggregationDataKey={"Something"}
        />
      </div>
    );
  };

  return (
    <div className="message" ref={ref}>
      <MessageBubble message={message}>{renderMessage()}</MessageBubble>
    </div>
  );
};

export default Message;

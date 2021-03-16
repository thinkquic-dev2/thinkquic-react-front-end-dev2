import React, { useContext } from "react";

import "./AppMessageTester.scss";

import { AppContext } from "../../AppContext";
import { useState } from "react";

import useAppResponseProcessor from "../../hooks/useAppResponseProcessor";

const AppMessageTester = () => {
  const { messages, setMessages } = useContext(AppContext);
  const { getFlatJsonResult, getResultType } = useAppResponseProcessor();
  const [isMinimized, setIsMinimized] = useState(true);
  const [jsonMessage, setJsonMessage] = useState("");
  const [jsonMessageParseError, setJsonMessageParseError] = useState(false);

  const openAppMessageTesterButton = isMinimized ? (
    <button onClick={() => setIsMinimized(false)} className="btn btn-outline-primary">
      open AppMessageTester
    </button>
  ) : null;

  const closeAppMessageTesterButton = isMinimized ? null : (
    <button onClick={() => setIsMinimized(true)} className="btn btn-outline-danger">
      close AppMessageTester
    </button>
  );

  const tableSampleButton = isMinimized ? null : (
    <button
      onClick={() =>
        setJsonMessage(
          JSON.stringify({
            Result: [
              { Doc1: { area: 7420, price: 13300000 } },
              { Doc2: { area: 8960, price: 12250000 } },
              { Doc3: { area: 7420, price: 11410000 } },
              { Doc4: { area: 6600, price: 9100000 } },
              { Doc5: { area: 5960, price: 8190000 } },
            ],
          })
        )
      }
      className="btn btn-primary mr-2"
    >
      Table Sample Data
    </button>
  );
  const basicSampleButton = isMinimized ? null : (
    <button
      onClick={() =>
        setJsonMessage(
          JSON.stringify({
            Result: {
              maximum_area: {
                value: 16200.0,
              },
            },
          })
        )
      }
      className="btn btn-primary mr-2"
    >
      Basic Sample Data
    </button>
  );

  const aggregationSampleButton = isMinimized ? null : (
    <button
      onClick={() =>
        setJsonMessage(
          JSON.stringify({
            Result: {
              Chart: {
                Aggregation: [
                  {
                    Aggregation1: {
                      statistics: {
                        stats_key: "price",
                        stats: {
                          count: 1090,
                          min: 1750000.0,
                          max: 13300000.0,
                          avg: 4766729.247706422,
                          sum: 5195734880.0,
                        },
                      },
                    },
                  },
                  {
                    Aggregation2: {
                      statistics: {
                        stats_key: "area",
                        stats: { count: 1090, min: 1650.0, max: 16200.0, avg: 5150.54128440367, sum: 5614090.0 },
                      },
                    },
                  },
                  {
                    Aggregation3: {
                      statistics: {
                        stats_key: "basement",
                        stats: [
                          { key: "no", doc_count: 708 },
                          { key: "yes", doc_count: 382 },
                        ],
                      },
                    },
                  },
                  {
                    Aggregation4: {
                      statistics: {
                        stats_key: "prefarea",
                        stats: [
                          { key: "no", doc_count: 834 },
                          { key: "yes", doc_count: 256 },
                        ],
                      },
                    },
                  },
                  {
                    Aggregation5: {
                      Aggregation1: {
                        Aggregation1: {
                          groupby1: {
                            group_by_prefarea: "no",
                            stats_key: "area_stats",
                            stats: { count: 834, min: 1650.0, max: 16200.0, avg: 4868.517985611511, sum: 4060344.0 },
                          },
                          groupby2: {
                            group_by_prefarea: "no",
                            stats_key: "price_stats",
                            stats: {
                              count: 834,
                              min: 1750000.0,
                              max: 12250000.0,
                              avg: 4425298.776978417,
                              sum: 3690699180.0,
                            },
                          },
                        },
                        Aggregation2: {
                          groupby3: {
                            group_by_prefarea: "yes",
                            stats_key: "area_stats",
                            stats: { count: 256, min: 1950.0, max: 13200.0, avg: 6069.3203125, sum: 1553746.0 },
                          },
                          groupby4: {
                            group_by_prefarea: "yes",
                            stats_key: "price_stats",
                            stats: {
                              count: 256,
                              min: 2233000.0,
                              max: 13300000.0,
                              avg: 5879045.703125,
                              sum: 1505035700.0,
                            },
                          },
                        },
                      },
                    },
                  },
                ],
                Data: [],
              },
              Button: [],
              Text: [],
            },
          })
        )
      }
      className="btn btn-primary mr-2"
    >
      Aggregation Sample Data
    </button>
  );

  const recordSampleButton = isMinimized ? null : (
    <button
      onClick={() =>
        setJsonMessage(
          JSON.stringify({
            Result: {
              Doc1: {
                price: 9800000,
                area: 5750,
                bedrooms: 3,
                bathrooms: 2,
                stories: 4,
                mainroad: "yes",
                guestroom: "yes",
                basement: "no",
                hotwaterheating: "no",
                airconditioning: "yes",
                parking: 1,
                prefarea: "yes",
                furnishingstatus: "unfurnished",
              },
            },
          })
        )
      }
      className="btn btn-primary mr-2"
    >
      Record Sample Data
    </button>
  );

  const optionsSampleButton = isMinimized ? null : (
    <button
      onClick={() =>
        setJsonMessage(
          JSON.stringify({
            Result: {
              Text: {
                Message1:
                  "Hello, Welcome to ThinkQuic. How can I help you today? To get started, you can say something from the following.",
              },
              Buttons: {
                Button1: "Search",
                Button2: "Filter",
                Button3: "Aggregation",
              },
            },
          })
        )
      }
      className="btn btn-primary mr-2"
    >
      Options Sample Data
    </button>
  );

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
            },
          },
        ],
      },
      Button: [],
      Text: [{ Text1: { value: "Search for 6000" } }],
    },
  };

  const originalJson = {
    Result: {
      Chart: {
        Aggregations: [
          {
            Aggregation1: {
              statistics: {
                stats_key: "rice",
                stats: {
                  count: 1090,
                  minimum: 1750000,
                  maximum: 13300000,
                  average: 4766729.247706422,
                  sum: 5195734880,
                },
              },
            },
          },
          {
            Aggregation2: {
              statistics: {
                stats_key: "area",
                stats: {
                  maximum: 13300000,
                },
              },
            },
          },
        ],
        Data: [
          {
            Doc1: {
              area: 7420,
              price: 13300000,
            },
          },
          {
            Doc2: {
              area: 8960,
              price: 12250000,
            },
          },
        ],
      },
      Button: [
        {
          Button1: {
            key: "search",
            value: "search",
          },
        },
        {
          Button2: {
            key: "filter",
            value: "filter",
          },
        },
        {
          Button3: {
            key: "aggregation",
            value: "aggregation",
          },
        },
      ],
      Text: [
        {
          Text1: {
            value: "Something important",
          },
        },
        {
          Text2: {
            value: "Some notification",
          },
        },
      ],
    },
  };

  const sample2 = {
    Result: {
      Chart: {
        Aggregations: [
          {
            Aggregation1: {
              statistics: {
                stats_key: "rice",
                stats: {
                  count: 1090,
                  minimum: 1750000,
                  maximum: 13300000,
                  average: 4766729.247706422,
                  sum: 5195734880,
                },
              },
            },
          },
          { Aggregation2: { statistics: { stats_key: "area", stats: { maximum: 13300000 } } } },
        ],
        Data: [
          { Doc1: { area: "7420 sq. ft.", price: "100000 $", estimatedValue: "1 $", type: "house" } },
          { Doc2: { area: "8960 sq ft", price: "12250000 $", bedrooms: 5, batchrooms: 4, stories: 2 } },
        ],
      },
      Button: [
        { Button1: { key: "search", value: "search" } },
        { Button2: { key: "filter", value: "filter" } },
        { Button3: { key: "aggregation", value: "aggregation" } },
      ],
      Text: [{ Text1: { value: "Something important" } }, { Text2: { value: "Some notification" } }],
    },
  };

  const jsonFromLexButton = isMinimized ? null : (
    <button onClick={() => setJsonMessage(JSON.stringify(sample2))} className="btn btn-primary mr-2">
      json from lex
    </button>
  );

  const newJsonSampleButton = isMinimized ? null : (
    <button onClick={() => setJsonMessage(JSON.stringify(json))} className="btn btn-primary mr-2">
      New Json Sample Data
    </button>
  );

  const appMessageTesterClass = isMinimized ? "app-message-tester" : "app-message-tester app-message-tester--active";

  const parsingErrorMessage = jsonMessageParseError ? (
    <div className="alert alert-danger mt-3">The JSON has errors</div>
  ) : null;

  const sendButtonClickHandler = (jsonMessage) => {
    setMessages([
      ...messages,
      {
        from: "app",
        message: jsonMessage,
      },
    ]);
    setIsMinimized(true);
  };

  const textareaChangeHandler = (textareaValue) => {
    setJsonMessageParseError(false);
    setJsonMessage(textareaValue);
  };

  const clearMessageButton = () => {
    return (
      <button
        onClick={() => {
          setMessages([]);
          localStorage.setItem("transcript", JSON.stringify([]));
        }}
      >
        Clear
      </button>
    );
  };

  return (
    <div className={appMessageTesterClass}>
      <div className="app-message-tester__toggles">
        {openAppMessageTesterButton}
        {aggregationSampleButton}
        {newJsonSampleButton}
        {jsonFromLexButton}
        {clearMessageButton()}
        {closeAppMessageTesterButton}
      </div>
      <div className="app-message-tester__query-box-container">
        {parsingErrorMessage}
        <textarea
          onChange={(event) => textareaChangeHandler(event.target.value)}
          value={jsonMessage}
          className="app-message-tester__textarea"
        ></textarea>
        <button
          onClick={() => sendButtonClickHandler(jsonMessage)}
          className="btn btn-success app-message-tester__send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AppMessageTester;

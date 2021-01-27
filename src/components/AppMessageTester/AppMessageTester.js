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
    <button
      onClick={() => setIsMinimized(false)}
      className="btn btn-outline-primary"
    >
      open AppMessageTester
    </button>
  ) : null;

  const closeAppMessageTesterButton = isMinimized ? null : (
    <button
      onClick={() => setIsMinimized(true)}
      className="btn btn-outline-danger"
    >
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
              Aggregation1: {
                statistics: {
                  stats_key: "price",
                  stats: {
                    count: 1090,
                    min: 1750000,
                    max: 13300000,
                    avg: 4766729.247706422,
                    sum: 5195734880,
                  },
                },
              },
              Aggregation2: {
                statistics: {
                  stats_key: "area",
                  stats: {
                    count: 1090,
                    min: 1650,
                    max: 16200,
                    avg: 5150.54128440367,
                    sum: 5614090,
                  },
                },
              },
              Aggregation3: {
                statistics: {
                  stats_key: "furnishingstatus",
                  stats: [
                    {
                      key: "semi-furnished",
                      doc_count: 454,
                    },
                    {
                      key: "unfurnished",
                      doc_count: 356,
                    },
                    {
                      key: "furnished",
                      doc_count: 280,
                    },
                  ],
                },
              },
              Aggregation4: {
                statistics: {
                  stats_key: "basement",
                  stats: [
                    {
                      key: "no",
                      doc_count: 708,
                    },
                    {
                      key: "yes",
                      doc_count: 382,
                    },
                  ],
                },
              },
              Aggregation5: {
                Aggregation1: {
                  Aggregation1: {
                    groupby1: {
                      groupby_key: {
                        furnishingstatus: "furnished",
                        basement: "no",
                      },
                      stats_key: "area",
                      stats: {
                        count: 166,
                        min: 2145,
                        max: 12900,
                        avg: 5607.361445783133,
                        sum: 930822,
                      },
                    },
                    groupby2: {
                      groupby_key: {
                        furnishingstatus: "furnished",
                        basement: "no",
                      },
                      stats_key: "price",
                      stats: {
                        count: 166,
                        min: 1750000,
                        max: 13300000,
                        avg: 5352673.975903614,
                        sum: 888543880,
                      },
                    },
                  },
                  Aggregation2: {
                    groupby3: {
                      groupby_key: {
                        furnishingstatus: "furnished",
                        basement: "yes",
                      },
                      stats_key: "area",
                      stats: {
                        count: 114,
                        min: 2145,
                        max: 13200,
                        avg: 5805.666666666667,
                        sum: 661846,
                      },
                    },
                    groupby4: {
                      groupby_key: {
                        furnishingstatus: "furnished",
                        basement: "yes",
                      },
                      stats_key: "price",
                      stats: {
                        count: 114,
                        min: 2590000,
                        max: 12215000,
                        avg: 5703956.140350877,
                        sum: 650251000,
                      },
                    },
                  },
                  Aggregation3: {
                    groupby5: {
                      groupby_key: {
                        furnishingstatus: "semi-furnished",
                        basement: "no",
                      },
                      stats_key: "area",
                      stats: {
                        count: 282,
                        min: 2000,
                        max: 15600,
                        avg: 5131.354609929078,
                        sum: 1447042,
                      },
                    },
                    groupby6: {
                      groupby_key: {
                        furnishingstatus: "semi-furnished",
                        basement: "no",
                      },
                      stats_key: "price",
                      stats: {
                        count: 282,
                        min: 1767150,
                        max: 10150000,
                        avg: 4720184.397163121,
                        sum: 1331092000,
                      },
                    },
                  },
                  Aggregation4: {
                    groupby7: {
                      groupby_key: {
                        furnishingstatus: "semi-furnished",
                        basement: "yes",
                      },
                      stats_key: "area",
                      stats: {
                        count: 172,
                        min: 1836,
                        max: 11440,
                        avg: 5223.697674418605,
                        sum: 898476,
                      },
                    },
                    groupby8: {
                      groupby_key: {
                        furnishingstatus: "semi-furnished",
                        basement: "yes",
                      },
                      stats_key: "price",
                      stats: {
                        count: 172,
                        min: 2275000,
                        max: 12250000,
                        avg: 5214674.4186046515,
                        sum: 896924000,
                      },
                    },
                  },
                  Aggregation5: {
                    groupby9: {
                      groupby_key: {
                        furnishingstatus: "unfurnished",
                        basement: "no",
                      },
                      stats_key: "area",
                      stats: {
                        count: 260,
                        min: 1700,
                        max: 16200,
                        avg: 4674.053846153846,
                        sum: 1215254,
                      },
                    },
                    groupby10: {
                      groupby_key: {
                        furnishingstatus: "unfurnished",
                        basement: "no",
                      },
                      stats_key: "price",
                      stats: {
                        count: 260,
                        min: 1750000,
                        max: 10150000,
                        avg: 3743923.076923077,
                        sum: 973420000,
                      },
                    },
                  },
                  Aggregation6: {
                    groupby11: {
                      groupby_key: {
                        furnishingstatus: "unfurnished",
                        basement: "yes",
                      },
                      stats_key: "area",
                      stats: {
                        count: 96,
                        min: 1650,
                        max: 8400,
                        avg: 4798.4375,
                        sum: 460650,
                      },
                    },
                    groupby12: {
                      groupby_key: {
                        furnishingstatus: "unfurnished",
                        basement: "yes",
                      },
                      stats_key: "price",
                      stats: {
                        count: 96,
                        min: 1820000,
                        max: 9100000,
                        avg: 4744833.333333333,
                        sum: 455504000,
                      },
                    },
                  },
                },
              },
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

  const newJsonSampleButton = isMinimized ? null : (
    <button
      onClick={() => setJsonMessage(JSON.stringify(json))}
      className="btn btn-primary mr-2"
    >
      New Json Sample Data
    </button>
  );

  const appMessageTesterClass = isMinimized
    ? "app-message-tester"
    : "app-message-tester app-message-tester--active";

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

  return (
    <div className={appMessageTesterClass}>
      <div className="app-message-tester__toggles">
        {openAppMessageTesterButton}
        {newJsonSampleButton}
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

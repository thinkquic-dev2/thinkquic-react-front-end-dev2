window["appConfig"] = {
  lex: {
    botName: "pocbot",
    botAlias: "DevBot",
    initialText: 'You can ask me for help ordering flowers. Just type "Buy flowers" or click on the mic and say it.',
    initialSpeechInstruction: "Say 'Buy Flowers' to get started.",
    reInitSessionAttributesOnRestart: false,
    region: "us-east-1",
  },
  cognito: {
    identityPoolId: "us-west-2:a2cb5a9d-d728-4c5c-a96e-b2973d14c5e0",
    UserPoolId: "us-west-2_jseVZL1mh",
    ClientId: "36nivl36qlp8fbnkpd2jv52fu",
    region: "us-west-2",
  },
  s3: {
    albumBucketName: "abotsrcbucketwest",
    uploadPath: "sourcefiles/",
    retrievePath: "processedfiles/",
    bucketRegion: "us-west-2",
    bucketVersionNumber: "2006-03-01",
  },
  polly: {
    voiceId: "Salli",
  },
  recorder: {
    preset: "speech_recognition",
  },
  app: {
    welcomeMessage: "Welcome to thinkquic. To get Started, Say “Hi” or “Hello”",
    isFileExplorerEnabled: true,
    maxFileUploadCount: 20,
    maxFileUploadSizeInKb: 1,
    sessionTimeOutInMinutes: 60,
    sessionTimeOutMessage: "Your session is about to expire. What would you like to do?",
    forceLogoutAfterTimeOutInMinutes: 1,
    fileUploadPendingMessage:
      "We are currently processing your files, please continue with your old files in the mean time",
    fileUploadSuccessMessage: "Your file has been successfully uploaded",
    surveyUrl: "https://thinkquic.com/",
  },
};

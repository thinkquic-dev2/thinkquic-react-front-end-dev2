import { useState, useEffect } from "react";
import useConfig from "./useConfig";
import * as AWS from "aws-sdk";

const useS3 = ({ isLoggedIn }) => {
  const appConfig = useConfig();
  const [s3, setS3] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      setS3(
        new AWS.S3({
          apiVersion: appConfig.s3.bucketVersionNumber,
          params: { Bucket: appConfig.s3.albumBucketName },
        })
      );
    }
  }, [isLoggedIn]);

  return {
    s3,
  };
};

export default useS3;

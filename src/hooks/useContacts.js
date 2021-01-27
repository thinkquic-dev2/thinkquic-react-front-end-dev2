import { useEffect, useState } from "react";
import AWS from "aws-sdk";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { allUser } from "../graphql/queries";

export function useContacts() {
  const [contacts, setContacts] = useState([]);
  const config = window["appConfig"];

  useEffect(() => {
    const fetchUsers = async () => {
      if (!contacts.length) {
        const res = await getUsers();
        return { contacts };
      }
    };
    //fetchUsers();
  }, []);

  const getUsers = async () => {
    try {
      let allUsers = [];
      let more = true;
      let paginationToken = "";

      while (more) {
        let params = {
          UserPoolId: "us-west-2_wmZKlEFnt",
          Limit: 60,
        };
        if (paginationToken !== "") {
          params.PaginationToken = paginationToken;
        }

        AWS.config.update({
          region: config.cognito.region,
          accessKeyId: config.credentials.accessKeyId,
          secretAccessKey: config.credentials.secretAccessKey,
        });

        const cognito = new AWS.CognitoIdentityServiceProvider();
        const rawUsers = await cognito.allUser(params).promise();
        allUsers = allUsers.concat(rawUsers.Users);
        if (rawUsers.PaginationToken) {
          paginationToken = rawUsers.PaginationToken;
        } else {
          more = false;
        }
      }
      setContacts(allUsers);
    } catch (e) {
      console.log(e);
    }
  };

  return { contacts };
}

import axios from "axios";

export const publicApi = axios.create({
  baseURL: "http://to-do-list-api-dev.us-east-2.elasticbeanstalk.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export let privateApi;

export const setupPrivateApi = (token) => {
  privateApi = axios.create({
    baseURL: "http://to-do-list-api-dev.us-east-2.elasticbeanstalk.com/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

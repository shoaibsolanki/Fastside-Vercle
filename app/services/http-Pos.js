import axios from "axios";
import { isDev } from "../Constant/URL.js";

export const BASEURL = {
  ENDPOINT_URL: isDev
    ? "http://103.148.165.246:8088/test/api/v1/"
    : "https://posprdapi.photonsoftwares.com/prod/api/v1/",
};

// export const authToken = localStorage.getItem('token');

const https = axios.create({
  baseURL: BASEURL.ENDPOINT_URL,
  // Optional headers or other configurations
});

export default https;
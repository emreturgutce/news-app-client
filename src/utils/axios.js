import axios from "axios";
import getToken from "./getToken";

export default axios.create({
  baseURL: "https://news-app-restapi.herokuapp.com",
  headers: { Authorization: `bearer ${getToken()}` },
});

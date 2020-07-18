import axios from "axios";

export default axios.create({
  baseURL: "https://news-app-restapi.herokuapp.com",
});

import axios from "axios";

export default axios.create({
  baseURL: "https://young-retreat-94433.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
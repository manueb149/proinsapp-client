import axios from "axios";

export default axios.create({
  // Production
  // baseURL: "https://young-retreat-94433.herokuapp.com/api",

  // Development
  baseURL: "http://localhost:8080/api",

  // validateStatus: function (status) {
  //   return status >= 200 && status <= 503;
  // },
});
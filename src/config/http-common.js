import axios from "axios";

export default axios.create({
  // Production
  baseURL: "https://proinsapp.herokuapp.com/api",

  // Development
  // baseURL: "http://localhost:8080/api",

});
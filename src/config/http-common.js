import axios from "axios";

export default axios.create({
  // Production
  baseURL: "https://servigruas.up.railway.app/api",

  // Development
  // baseURL: "http://localhost:8080/api",

});
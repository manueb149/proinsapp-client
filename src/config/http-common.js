import axios from "axios";

export default axios.create({
  // Production
  baseURL: process?.env['REACT_APP_API_URL'] || "https://proinsapp.herokuapp.com/api",

  // Development
  // baseURL: process?.env['REACT_APP_API_URL'] || "http://localhost:8000/api",

});
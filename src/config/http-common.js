import axios from "axios";

console.log('REACT_APP_API_URL: ', process?.env['REACT_APP_API_URL'])

export default axios.create({
  // Production
  // baseURL: process?.env['REACT_APP_API_URL'] || "",

  // Development
  baseURL: process?.env['REACT_APP_API_URL'] || "http://localhost:8000/api",

});
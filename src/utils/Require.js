import axios from "axios";
import { BASE_URL } from "./pathMap";

const instance = axios.create({
  baseURL: BASE_URL,
  //   timeout: 2000,
});

const exp = {
  get: instance.get,
  post: instance.post,
};

export default exp;

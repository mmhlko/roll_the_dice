import axios from "axios";

export const api = axios.create();

api.defaults.baseURL = "https://api.cibet.dev.bet4skill.com/api/";
api.defaults.withCredentials = true;
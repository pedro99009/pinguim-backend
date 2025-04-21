import axios, { AxiosInstance } from "axios";

export class AxiosClient {
  private static instance: AxiosInstance;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!AxiosClient.instance) {
      AxiosClient.instance = axios.create({
        baseURL: "https://stats.nba.com/stats",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Referer": "https://www.nba.com/",
          "Origin": "https://www.nba.com/",
        },
      });
    }
    return AxiosClient.instance;
  }
}

export default AxiosClient;
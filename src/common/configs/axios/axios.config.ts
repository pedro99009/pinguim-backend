import axios, { AxiosInstance } from "axios";

export class AxiosClient {
  private static instance: AxiosInstance;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!AxiosClient.instance) {
      AxiosClient.instance = axios.create({
        baseURL: "https://api.balldontlie.io/v1",
        headers: {
          Authorization: "f725831e-8411-452d-8213-b65bf2ec4080",
          "Content-Type": "application/json",
        },
      });
    }
    return AxiosClient.instance;
  }
}

export default AxiosClient;
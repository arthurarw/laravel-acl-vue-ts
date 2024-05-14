import axios, { AxiosInstance } from "axios";
import HttpClient from "./HttpClient";
import { API_URL, TOKEN_NAME } from "@/utils/constants";

class HttpClientAdapter implements HttpClient {
  private axiosInstance: AxiosInstance | null = null;
  private static instance: HttpClientAdapter | null = null;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  static getInstance(): HttpClient {
    if (!this.instance) {
      this.instance = new HttpClientAdapter();
    }

    return this.instance;
  }

  async get(url: string, configs?: object | undefined): Promise<any> {
    return await this.axiosInstance?.get(url, configs);
  }

  async post(
    url: string,
    body: any,
    configs?: object | undefined,
  ): Promise<any> {
    return await this.axiosInstance?.post(url, body, configs);
  }

  async put(
    url: string,
    body: any,
    configs?: object | undefined,
  ): Promise<any> {
    return await this.axiosInstance?.put(url, body, configs);
  }

  async delete(url: string, configs?: object | undefined): Promise<any> {
    return await this.axiosInstance?.delete(url, configs);
  }

  withAuthorization(): this {
    if (this.axiosInstance) {
      const token = localStorage.getItem(TOKEN_NAME);
      this.axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }

    return this;
  }
}

export default HttpClientAdapter.getInstance();

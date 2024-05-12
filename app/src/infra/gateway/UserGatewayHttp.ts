import HttpClientAdapter from "../http/HttpClientAdapter";

export default class UserGatewayHttp {
  async login(email: string, password: string): Promise<any> {
    const deviceName = `app_vue_${navigator.userAgent}`;
    return await HttpClientAdapter.post("/login", {
      email,
      password,
      device_name: deviceName,
    });
  }
}

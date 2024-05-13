import { getBrowserName, slugify } from "@/helpers/string";
import HttpClientAdapter from "@/infra/http/HttpClientAdapter";
import { TOKEN_NAME } from "@/utils/constants";

export default class UserGatewayHttp {
  async login(email: string, password: string): Promise<any> {
    const userAgent = slugify(getBrowserName(navigator.userAgent));
    const deviceName = `app-vue-${userAgent}`;
    return await HttpClientAdapter.post("/login", {
      email,
      password,
      device_name: deviceName,
    })
      .then((response) => {
        localStorage.setItem(TOKEN_NAME, response.data.token);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_NAME);
      });
  }
}

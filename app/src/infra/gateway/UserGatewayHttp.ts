import { getBrowserName, slugify } from "@/helpers/string";
import HttpClientAdapter from "@/infra/http/HttpClientAdapter";
import { IUser } from "@/interfaces/IUser";
import { TOKEN_NAME } from "@/utils/constants";

export default class UserGatewayHttp {
  async login(email: string, password: string): Promise<Response> {
    const userAgent = slugify(getBrowserName(navigator.userAgent));
    const deviceName = `app-vue-${userAgent}`;
    return await HttpClientAdapter.post("/login", {
      email,
      password,
      device_name: deviceName,
    }).then((response) => {
      localStorage.setItem(TOKEN_NAME, response.data.token);
      return Promise.resolve(response);
    });
  }

  async getMe(): Promise<IUser> {
    const response = await HttpClientAdapter.withAuthorization()
      .get("/me")
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem(TOKEN_NAME);
        }
      });

    return response;
  }
}

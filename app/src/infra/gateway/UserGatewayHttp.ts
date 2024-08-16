import Permission from "@/entities/Permission";
import User from "@/entities/User";
import { getBrowserName, slugify } from "@/helpers/string";
import HttpClientAdapter from "@/infra/http/HttpClientAdapter";
import router from "@/router";
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

  async getMe(): Promise<User> {
    const response = await HttpClientAdapter.withAuthorization()
      .get("/me")
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem(TOKEN_NAME);
          return router.push({ name: "auth.login" });
        }

        if (error.response.status === 403) {
          localStorage.removeItem(TOKEN_NAME);
          return router.push({ name: "auth.login" });
        }
      });

    const { id, name, email, permissions } = response;

    const permissionsList: Permission[] = permissions.map(
      (permission: Permission) => {
        return new Permission(
          permission.id,
          permission.name,
          permission.description,
        );
      },
    );

    const user = new User(id, name, email);
    user.syncPermissions(permissionsList);

    return user;
  }
}

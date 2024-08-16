import Permission from "@/entities/Permission";
import User from "@/entities/User";
import { getBrowserName, slugify } from "@/utils/string";
import HttpClientAdapter from "@/infra/http/HttpClientAdapter";
import router from "@/router";
import { TOKEN_NAME } from "@/utils/constants";
import { Pagination } from "@/interfaces/Pagination";

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

    const { id, name, email, permissions, is_super_admin } = response;

    const permissionsList: Permission[] = permissions.map(
      (permission: Permission) => {
        return new Permission(
          permission.id,
          permission.name,
          permission.description,
        );
      },
    );

    const user = new User(id, name, email, is_super_admin);
    user.syncPermissions(permissionsList);

    return user;
  }

  async getPaginate(
    page: number = 1,
    perPage: number = 15,
    filter: string = "",
  ): Promise<{ users: User[]; meta: Pagination }> {
    const response = await HttpClientAdapter.withAuthorization()
      .get(`/users?page=${page}&per_page=${perPage}&filter=${filter}`)
      .then((response) => {
        return response.data;
      });

    const users: User[] = response.data.map((user: any) => {
      return new User(user.id, user.name, user.email, user.is_super_admin);
    });

    return { users, meta: response.meta };
  }
}

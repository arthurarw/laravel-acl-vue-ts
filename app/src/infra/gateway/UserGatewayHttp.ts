import Permission from "@/entities/Permission";
import User from "@/entities/User";
import HttpClientAdapter from "@/infra/http/HttpClientAdapter";
import { Pagination } from "@/interfaces/Pagination";
import { StoreUser, UpdateUser } from "@/interfaces/User";
import router from "@/router";
import { TOKEN_NAME } from "@/utils/constants";
import { getBrowserName, slugify } from "@/utils/string";

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

  async store(params: StoreUser): Promise<User> {
    const response = await HttpClientAdapter.withAuthorization()
      .post("/users", params)
      .then((response) => response.data);

    return new User(
      response.id,
      response.name,
      response.email,
      response.is_super_admin,
    );
  }

  async getById(userId: string): Promise<User> {
    const response = await HttpClientAdapter.withAuthorization()
      .get(`/users/${userId}`)
      .then((response) => {
        return response.data;
      });

    const { id, name, email, is_super_admin } = response.data;

    return new User(id, name, email, is_super_admin);
  }

  async destroy(userId: string): Promise<void> {
    await HttpClientAdapter.withAuthorization()
      .delete(`/users/${userId}`)
      .then((response) => {
        return response.data;
      });
  }

  async update(params: UpdateUser): Promise<Response> {
    return await HttpClientAdapter.withAuthorization()
      .put(`/users/${params.id}`, params)
      .then((response) => {
        return response.data;
      });
  }

  async logout(): Promise<Response> {
    return await HttpClientAdapter.withAuthorization()
      .post("/logout", {})
      .then((response) => {
        localStorage.removeItem(TOKEN_NAME);
        return Promise.resolve(response);
      });
  }
}

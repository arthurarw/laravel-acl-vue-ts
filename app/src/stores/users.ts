import Permission from "@/entities/Permission";
import User from "@/entities/User";
import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import { Pagination } from "@/interfaces/Pagination";
import { StoreUser, UpdateUser } from "@/interfaces/User";
import { defineStore } from "pinia";

const userGateway = new UserGatewayHttp();

export const useUsersStore = defineStore("users", {
  state: () => ({
    me: null as null | User,
    users: [] as User[],
    meta: undefined as undefined | Pagination,
    userView: null as null | User,
  }),
  getters: {
    hasUsers: (state): boolean => state.users.length > 0,
  },
  actions: {
    async auth(email: string, password: string): Promise<Response> {
      return await userGateway.login(email, password);
    },
    async getMe(): Promise<void> {
      await userGateway.getMe().then((user) => {
        this.me = user;
      });
    },
    async getPaginate(
      page: number = 1,
      perPage: number = 15,
      filter: string = "",
    ): Promise<void> {
      await userGateway.getPaginate(page, perPage, filter).then((response) => {
        this.users = response.users;
        this.meta = response.meta;
      });
    },
    async store(params: StoreUser): Promise<void> {
      await userGateway.store(params);
    },
    async getById(id: string): Promise<User> {
      return await userGateway.getById(id);
    },
    async destroy(id: string): Promise<void> {
      await userGateway.destroy(id);
    },
    async update(params: UpdateUser): Promise<void> {
      await userGateway.update(params);
    },
    async logout(): Promise<void> {
      await userGateway.logout().then(() => this.clear());
    },
    async clear(): Promise<void> {
      this.me = null;
      this.users = [];
      this.meta = undefined;
    },
    addUserInView(user: User): void {
      this.userView = user;
    },
    addPermissionOfUser(permissions: Permission): void {
      this.userView?.addPermission(permissions);
    },
    removePermissionOfUser(permissions: Permission): void {
      const updatePermissions = this.userView?.permissions.filter(
        (permission) => permission.id !== permissions.id,
      );

      if (updatePermissions) {
        this.userView?.syncPermissions(updatePermissions);
      }
    },

    async syncPermissions(): Promise<Response> {
      return await userGateway.syncPermissions(this.userView!);
    },
  },
});

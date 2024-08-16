import User from "@/entities/User";
import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import { Pagination } from "@/interfaces/Pagination";
import { StoreUser } from "@/interfaces/User";
import { defineStore } from "pinia";

const userGateway = new UserGatewayHttp();

export const useUsersStore = defineStore("users", {
  state: () => ({
    me: null as null | User,
    users: [] as User[],
    meta: undefined as undefined | Pagination,
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
  },
});

import { defineStore } from "pinia";
import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import { IUser } from "@/interfaces/IUser";

const userGateway = new UserGatewayHttp();

export const useUsersStore = defineStore("users", {
  state: () => ({
    me: null as null | IUser,
    users: [] as IUser[],
  }),
  getters: {
    hasUsers: (state) => state.users.length > 0,
  },
  actions: {
    async auth(email: string, password: string): Promise<any> {
      return await userGateway.login(email, password);
    },
    async getMe(): Promise<void> {
      await userGateway.getMe().then((user) => {
        this.me = user;
      });
    },
  },
});

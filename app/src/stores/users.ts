import { defineStore } from "pinia";
import UserGatewayHttp from "../infra/gateway/UserGatewayHttp";

const userGateway = new UserGatewayHttp();

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  getters: {
    hasUsers: (state) => state.users.length > 0,
  },
  actions: {
    async auth(email: string, password: string): Promise<any> {
      return await userGateway.login(email, password);
    },
  },
});

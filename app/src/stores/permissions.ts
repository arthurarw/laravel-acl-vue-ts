import Permission from "@/entities/Permission";
import PermissionGatewayHttp from "@/infra/gateway/PermissionGatewayHttp";
import { Pagination } from "@/interfaces/Pagination";
import { StorePermission, UpdatePermission } from "@/interfaces/Permission";
import { defineStore } from "pinia";

const permissionGateway = new PermissionGatewayHttp();

export const usePermissionStore = defineStore("permissions", {
  state: () => ({
    me: null as null | Permission,
    permissions: [] as Permission[],
    meta: undefined as undefined | Pagination,
  }),
  getters: {
    hasPermissions: (state): boolean => state.permissions.length > 0,
  },
  actions: {
    async getPaginate(
      page: number = 1,
      filter: string = "",
      totalPerPage: number = 15,
    ): Promise<void> {
      await permissionGateway
        .getPaginate(page, totalPerPage, filter)
        .then((response) => {
          this.permissions = response.permissions;
          this.meta = response.meta;
        });
    },
    async create(params: StorePermission): Promise<void> {
      const permission = await permissionGateway.store(params);
      this.permissions.push(permission);
    },
    async getById(id: string): Promise<Permission> {
      return await permissionGateway.getById(id);
    },
    async destroy(id: string): Promise<void> {
      await permissionGateway
        .destroy(id)
        .then(
          () =>
            (this.permissions = this.permissions.filter(
              (permission) => permission.id !== id,
            )),
        );
    },

    async update(params: UpdatePermission): Promise<Response> {
      return await permissionGateway.update(params);
    },
  },
});

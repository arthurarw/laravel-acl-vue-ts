import Permission from "@/entities/Permission";
import HttpClientAdapter from "@/infra/http/HttpClientAdapter";
import { Pagination } from "@/interfaces/Pagination";
import { StorePermission, UpdatePermission } from "@/interfaces/Permission";

export default class PermissionGatewayHttp {
  async getPaginate(
    page: number = 1,
    perPage: number = 15,
    filter: string = "",
  ): Promise<{ permissions: Permission[]; meta: Pagination }> {
    const response = await HttpClientAdapter.withAuthorization()
      .get(`/permissions?page=${page}&per_page=${perPage}&filter=${filter}`)
      .then((response) => {
        return response.data;
      });

    const permissionData = response.data;

    const permissions: Permission[] = permissionData.map(
      (permission: Permission) => {
        return new Permission(
          permission.id,
          permission.name,
          permission.description,
        );
      },
    );

    return { permissions, meta: response.meta };
  }

  async store(params: StorePermission): Promise<Permission> {
    const response = await HttpClientAdapter.withAuthorization()
      .post("/permissions", params)
      .then((response) => response.data);

    return new Permission(response.id, response.name, response.description);
  }

  async getById(permissionId: string): Promise<Permission> {
    const response = await HttpClientAdapter.withAuthorization()
      .get(`/permissions/${permissionId}`)
      .then((response) => {
        return response.data;
      });

    const { id, name, description } = response.data;

    return new Permission(id, name, description);
  }

  async destroy(permissionId: string): Promise<boolean> {
    return await HttpClientAdapter.withAuthorization()
      .delete(`/permissions/${permissionId}`)
      .then(() => true)
      .catch(() => false);
  }

  async update(params: UpdatePermission): Promise<Response> {
    return await HttpClientAdapter.withAuthorization()
      .put(`/permissions/${params.id}`, params)
      .then((response) => {
        return response.data;
      });
  }
}

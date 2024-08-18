export type StorePermission = {
  name: string;
  route_name: string;
  description?: string;
};

export type UpdatePermission = {
  id?: string;
} & StorePermission;

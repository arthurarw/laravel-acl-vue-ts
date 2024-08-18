export type StorePermission = {
  name: string;
  routeName: string;
  description?: string;
};

export type UpdatePermission = {
  id: string;
} & StorePermission;

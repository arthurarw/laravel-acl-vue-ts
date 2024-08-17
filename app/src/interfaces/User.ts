export type StoreUser = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUser = {
  id: string;
} & StoreUser;

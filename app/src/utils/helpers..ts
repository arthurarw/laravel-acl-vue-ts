import { useUsersStore } from "@/stores/users";

export const userHasPermission = (permissionName: string): boolean => {
  let hasPermission = false;
  const userStore = useUsersStore();

  const user = userStore.me;
  if (user?.isSuperAdmin) {
    return true;
  }

  user?.permissions.map((permission) => {
    if (permission.name === permissionName) {
      hasPermission = true;
    }
  });

  return hasPermission;
};

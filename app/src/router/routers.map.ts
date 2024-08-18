import AuthTemplate from "@/layouts/AuthTemplate.vue";
import LoginPage from "@/pages/Auth/Login.vue";
import ForgotPassword from "@/pages/Auth/ForgotPassword.vue";
import DefaultTemplate from "@/layouts/DefaultTemplate.vue";
import HomeAdminPage from "@/pages/Admin/home/HomeAdmin.vue";
import ListUsers from "@/pages/Admin/users/ListUsers.vue";
import CreateUser from "@/pages/Admin/users/CreateUser.vue";
import DetailUser from "@/pages/Admin/users/DetailUser.vue";
import EditUser from "@/pages/Admin/users/EditUser.vue";
import CreatePermission from "@/pages/Admin/permissions/CreatePermission.vue";
import DetailPermission from "@/pages/Admin/permissions/DetailPermission.vue";
import EditPermission from "@/pages/Admin/permissions/EditPermission.vue";
import ListPermissions from "@/pages/Admin/permissions/ListPermissions.vue";
import PermissionsUser from "@/pages/Admin/users/PermissionsUser.vue";

export const routes = [
  {
    path: "/",
    component: AuthTemplate,
    children: [
      {
        name: "auth.login",
        path: "",
        component: LoginPage,
      },
      {
        name: "auth.forgot.password",
        path: "forgot-password",
        component: ForgotPassword,
      },
    ],
  },
  {
    path: "/admin",
    component: DefaultTemplate,
    children: [
      {
        path: "permissions/:id/edit",
        component: EditPermission,
        name: "permissions.edit",
        props: true,
      },
      {
        path: "permissions/:id",
        component: DetailPermission,
        name: "permissions.show",
        props: true,
      },
      {
        path: "permissions/create",
        component: CreatePermission,
        name: "permissions.create",
      },
      {
        path: "permissions",
        component: ListPermissions,
        name: "permissions.index",
      },
      {
        name: "users.edit",
        path: "users/:id/edit",
        component: EditUser,
        props: true,
      },
      {
        name: "users.show",
        path: "users/:id",
        component: DetailUser,
        props: true,
      },
      {
        name: "users.create",
        path: "users/create",
        component: CreateUser,
      },
      {
        name: "users.index",
        path: "users",
        component: ListUsers,
      },
      {
        name: "users.permissions",
        path: "users/permissions",
        component: PermissionsUser,
      },
      {
        name: "admin.home",
        path: "",
        component: HomeAdminPage,
      },
    ],
  },
];

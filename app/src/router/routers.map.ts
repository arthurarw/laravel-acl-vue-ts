import AuthTemplate from "@/layouts/AuthTemplate.vue";
import LoginPage from "@/pages/Auth/Login.vue";
import ForgotPassword from "@/pages/Auth/ForgotPassword.vue";
import DefaultTemplate from "@/layouts/DefaultTemplate.vue";
import HomeAdminPage from "@/pages/Admin/home/HomeAdmin.vue";
import ListUsers from "@/pages/Admin/users/ListUsers.vue";

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
        name: "users.index",
        path: "users",
        component: ListUsers,
      },
      {
        name: "admin.home",
        path: "",
        component: HomeAdminPage,
      },
    ],
  },
];

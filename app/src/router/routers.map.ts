import HomePage from "../pages/HomePage.vue";
import AuthTemplate from "../layouts/AuthTemplate.vue";
import LoginPage from "../pages/Auth/LoginPage.vue";
import ForgotPassword from "../pages/Auth/ForgotPassword.vue";
import DefaultTemplate from "../layouts/DefaultTemplate.vue";

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
        name: "admin.home",
        path: "",
        component: HomePage,
      },
    ],
  },
];

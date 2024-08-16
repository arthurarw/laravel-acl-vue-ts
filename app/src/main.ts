import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import router from "./router";
import { can } from "./directives";

const pinia = createPinia();
const app = createApp(App);

app.directive("can", can);
app.use(pinia);
app.use(router);
app.mount("#app");

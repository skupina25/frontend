import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import FileSelector from "vue-file-selector";

Vue.config.productionTip = false;

Vue.use(FileSelector);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

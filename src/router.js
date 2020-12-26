import Vue from "vue";
import Router from "vue-router";
import UploadFileToS3 from "./components/UploadFileToS3";
import AllImages from "./components/AllImages";
import HelloWorld from "./components/HelloWorld";
import Statistics from "./components/Statistics";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: HelloWorld,
    },
    {
      path: "/all-images",
      component: AllImages,
    },
    {
      path: "/upload",
      component: UploadFileToS3,
    },
    {
      path: "/statistics",
      component: Statistics,
    },
  ],
});

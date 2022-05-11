/**
=========================================================
* Vue Soft UI Dashboard - v2.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-soft-ui-dashboard
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

library.add(fab, fas, far);
const options = {
  // You can set your default options here
};

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(Toast, options);
appInstance.use(SoftUIDashboard);
appInstance.component("font-awesome-icon", FontAwesomeIcon);
appInstance.mount("#app");

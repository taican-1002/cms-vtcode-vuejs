<template>
  <div class="card mb-4 position-relative">
    <div class="card-header pb-0 table-header">
      <h1>Footer</h1>
      <AddFooter />
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                ID
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Name
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Description
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in itemFooter" :key="item.id">
              <td class="table-id">
                {{ item.id }}
              </td>
              <td>{{ item.name }}</td>
              <td>
                <ul
                  v-for="(itemDes, index) in item.description"
                  :key="index"
                  class="footer-des"
                >
                  <li v-if="itemDes.icon && itemDes.icon != []">
                    Icon:
                    <font-awesome-icon
                      v-for="(iconFooter, index) in itemDes.icon"
                      :key="index"
                      :icon="iconFooter"
                      class="footer-icon"
                    />
                  </li>
                  <li
                    v-if="itemDes.text && itemDes.text.trim() != ''"
                    class="footer-des__text"
                  >
                    Content : {{ itemDes.text }}
                  </li>
                </ul>
              </td>
              <td class="footer-action">
                <EditFooter :footerItem="item" />
                <DeleteFooter :footerItem="item" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AddFooter from "./AddFooter/AddFooter.vue";
import EditFooter from "./EditFooter/EditFooter.vue";
import DeleteFooter from "./DeleteFooter/DeleteFooter.vue";

import { mapGetters } from "vuex";

export default {
  name: "footer-main",
  components: { AddFooter, EditFooter, DeleteFooter },
  computed: mapGetters(["itemFooter"]),
};
</script>
<style scoped>
ul {
  padding: 0;
}
li {
  list-style: none;
}
.btn-close {
  background: #596cff
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 16 16'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e")
    center/1em auto no-repeat !important;
}
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.table-id {
  padding: 0.75rem 1.5rem;
}
.table-action {
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-action {
  text-align: center;
}
.footer-icon {
  margin-right: 0.5rem;
}
.footer-des {
  white-space: nowrap;
  width: 35rem;
  overflow: hidden;
}
.footer-des__text {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

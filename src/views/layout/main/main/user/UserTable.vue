<template>
  <div class="card mb-4">
    <div class="card-header pb-0 table-header">
      <h1>User</h1>
      <AddUser />
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <tableCommon>
          <template v-slot:tableThead>
            <th
              v-for="item in userTable"
              :key="item"
              :class="item.class"
              @click="sort(item.name)"
            >
              {{ item.name }}
            </th></template
          >
          <template v-slot:tableTbody>
            <tr v-for="item in sortedUser" :key="item.id">
              <td class="table-id">
                {{ item.id }}
              </td>
              <td>{{ item.email }}</td>
              <td>{{ item.password }}</td>
              <td>{{ item.role.name }}</td>
              <td class="table-action">
                <EditUser :user="item" />
                <DeleteUser :user="item" />
              </td>
            </tr>
          </template>
        </tableCommon>
      </div>
    </div>
  </div>
</template>

<script>
import AddUser from "./AddUser.vue";
import EditUser from "./EditUser.vue";
import DeleteUser from "./DeleteUser.vue";
import { mapGetters } from "vuex";
import Table from "../../../../components/common/Table.vue";
export default {
  name: "user-table",

  components: { AddUser, EditUser, DeleteUser, tableCommon: Table },
  computed: {
    ...mapGetters(["users"]),
    sortedUser() {
      return this.sortedUser2();
    },
  },
  data() {
    return {
      userTable: [
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
          name: "id",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "email",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "password",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "role",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2",
          name: "action",
        },
      ],
      //Sort User
      currentSort: "id",
      currentSortDir: "asc",
    };
  },
  // mounted() {
  //   const userLocal = JSON.parse(localStorage.getItem("user"));
  //   this.userRe = userLocal;
  // },
  methods: {
    //Sort User
    sort: function (s) {
      //  if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    //Sort User
    sortedUser2() {
      return this.users.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
  },
};
</script>
<style scoped>
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
</style>

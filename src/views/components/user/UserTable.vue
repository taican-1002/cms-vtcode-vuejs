<template>
  <div class="card mb-4">
    <div class="card-header pb-0 table-header">
      <h1>Users</h1>
      <AddUser />
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
                Email
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Password
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in users" :key="item.id">
              <td class="table-id">
                {{ item.id }}
              </td>
              <td>{{ item.email }}</td>
              <td>{{ item.password }}</td>
              <td class="table-action">
                <EditUser :user="item" />
                <DeleteUser :user="item" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AddUser from "./AddUser/AddUser.vue";
import EditUser from "./EditUser/EditUser.vue";
import DeleteUser from "./DeleteUser/DeleteUser.vue";
import { mapGetters } from "vuex";

export default {
  name: "user-table",

  components: { AddUser, EditUser, DeleteUser },
  computed: mapGetters(["users"]),
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

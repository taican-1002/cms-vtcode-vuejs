<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <UserTable />
      </div>
    </div>
  </div>
</template>

<script>
import UserTable from "./components/user/UserTable";

export default {
  name: "user",
  components: {
    UserTable,
  },
};
</script>

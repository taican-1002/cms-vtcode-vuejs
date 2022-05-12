<template>
  <div class="card mb-4">
    <div class="card-header pb-0 table-header">
      <h1>Banners</h1>
      <AddBanner />
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
                Slogan
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Description
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Image
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in banners" :key="item.id">
              <td class="table-id">
                {{ item.id }}
              </td>
              <td>{{ item.slogan }}</td>
              <td class="banner-des">{{ item.description }}</td>
              <td>
                <img :src="item.image" class="banner-img" />
              </td>
              <td class="table-action">
                <EditBanner :banner="item" />
                <DeleteBanner :banner="item" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AddBanner from "./AddBanner.vue";
import EditBanner from "./EditBanner.vue";
import DeleteBanner from "./DeleteBanner.vue";
import { mapGetters } from "vuex";

export default {
  name: "banner-dashboard",

  components: {
    AddBanner,
    EditBanner,
    DeleteBanner,
  },
  computed: mapGetters(["banners"]),
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
  text-align: center;
}
.banner-des {
  max-width: 20rem;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: break-spaces;
}
.banner-img {
  width: 10rem;
  height: 10rem;
  border-radius: 5px;
}
</style>

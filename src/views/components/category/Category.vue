<template>
  <div class="card mb-4">
    <div class="card-header pb-0 table-header">
      <h1>Category</h1>
      <AddCategory />
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                v-for="item in cateTable"
                :key="item"
                :class="item.class"
                @click="sort(item.name)"
              >
                {{ item.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedCategory" :key="item.id">
              <td class="table-id">
                {{ item.id }}
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.seo }}</td>
              <td class="table-action">
                <EditCategory :category="item" />
                <DeleteCategory :category="item" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AddCategory from "./AddCategory.vue";
import EditCategory from "./EditCategory.vue";
import DeleteCategory from "./DeleteCategory.vue";
import { mapGetters } from "vuex";

export default {
  name: "category-dashboard",
  components: { AddCategory, EditCategory, DeleteCategory },
  computed: {
    ...mapGetters(["categories"]),
    sortedCategory() {
      return this.sortedCategory2();
    },
  },
  data() {
    return {
      cateTable: [
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
          name: "id",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "name",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "seo",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2",
          name: "action",
        },
      ],
      //Sort Category
      currentSort: "id",
      currentSortDir: "asc",
    };
  },
  methods: {
    //Sort Category
    sort: function (s) {
      //  if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    //Sort Category
    sortedCategory2() {
      return this.categories.sort((a, b) => {
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

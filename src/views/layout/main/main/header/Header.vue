<template>
  <div class="card mb-4">
    <div class="card-header pb-0 table-header">
      <h1>Header Item</h1>
      <AddHeader />
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <tableCommon>
          <template v-slot:tableThead>
            <th
              v-for="item in thTable"
              :key="item"
              :class="item.class"
              @click="sort(item.name)"
            >
              {{ item.name }}
            </th></template
          >
          <template v-slot:tableTbody>
            <tr v-for="item in sortedHeader" :key="item.id">
              <td class="table-id">
                {{ item.id }}
              </td>

              <td>{{ item.name }}</td>

              <td class="table-action">
                <EditHeader :header="item" />
                <DeleteHeader :header="item" />
              </td></tr
          ></template>
        </tableCommon>
      </div>
    </div>
  </div>
  <div class="card mb-4">
    <div class="card-header pb-0 table-header">
      <h1>Header Logo</h1>
      <AddLogo />
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <tableCommon>
          <template v-slot:tableThead>
            <th
              v-for="item in logoTable"
              :key="item"
              :class="item.class"
              @click="sortLogo(item.name)"
            >
              {{ item.name }}
            </th></template
          >
          <template v-slot:tableTbody>
            <tr v-for="item in sortedLogo" :key="item.id">
              <td class="table-id">
                {{ item.id }}
              </td>
              <td>
                <img :src="item.img" alt="" class="header__img" />
              </td>
              <td>{{ item.name }}</td>
              <td class="table-action">
                <EditLogo :logo="item" />
                <DeleteLogo :logo="item" />
              </td>
            </tr>
          </template>
        </tableCommon>
      </div>
    </div>
  </div>
</template>

<script>
import AddHeader from "./AddHeader.vue";
import AddLogo from "./AddLogo.vue";
import EditHeader from "./EditHeader.vue";
import EditLogo from "./EditLogo.vue";
import DeleteHeader from "./DeleteHeader.vue";
import DeleteLogo from "./DeleteLogo.vue";
import { mapGetters } from "vuex";
import Table from "../../../../components/common/Table.vue";

export default {
  name: "header-dashboard",

  components: {
    AddHeader,
    AddLogo,
    EditHeader,
    EditLogo,
    DeleteHeader,
    DeleteLogo,
    tableCommon: Table,
  },

  computed: {
    ...mapGetters(["headers", "logos"]),
    sortedHeader() {
      return this.sortedHeader2();
    },
    sortedLogo() {
      return this.sortedLogo2();
    },
  },
  methods: {
    //Sort Header
    sort: function (s) {
      //  if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    //Sort Logo
    sortLogo: function (s) {
      //  if s == current sort, reverse
      if (s === this.currentSortLogo) {
        this.currentSortDirLogo =
          this.currentSortDirLogo === "asc" ? "desc" : "asc";
      }
      this.currentSortLogo = s;
    },
    //Sort Header
    sortedHeader2() {
      return this.headers.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    //Sort Logo
    sortedLogo2() {
      return this.logos.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDirLogo === "desc") modifier = -1;
        if (a[this.currentSortLogo] < b[this.currentSortLogo])
          return -1 * modifier;
        if (a[this.currentSortLogo] > b[this.currentSortLogo])
          return 1 * modifier;
        return 0;
      });
    },
  },

  data() {
    return {
      thTable: [
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
            "text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2",
          name: "action",
        },
      ],
      logoTable: [
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
          name: "id",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "logo",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "name",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2",
          name: "action",
        },
      ],
      //Sort Header
      currentSort: "id",
      currentSortDir: "asc",
      //Sort Logo
      currentSortLogo: "id",
      currentSortDirLogo: "asc",
    };
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
  text-align: center;
}
.header__img {
  width: 10rem;
  height: 10rem;
  object-fit: contain;
  /* border-radius: 100%; */
}
</style>

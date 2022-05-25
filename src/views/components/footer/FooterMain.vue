<template>
  <!-- FOOTER -->
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
                v-for="item in footerTable"
                :key="item"
                :class="item.class"
                @click="sortFooter(item.name)"
              >
                {{ item.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedFooter" :key="item.id">
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
                  <li
                    v-if="itemDes.text != '' && itemDes.text.trim()"
                    class="footer-des__text"
                  >
                    {{ itemDes.text }}
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
  <!-- FOOTER FOLLOW -->
  <div class="card mb-4 position-relative">
    <div class="card-header pb-0 table-header">
      <h1>Footer Follow</h1>
      <AddFooterFollow />
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                v-for="item in footerFollowTable"
                :key="item"
                :class="item.class"
                @click="sortFollow(item.name)"
              >
                {{ item.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedFollow" :key="item.id">
              <td class="table-id">
                {{ item.id }}
              </td>
              <td>{{ item.name }}</td>
              <td><font-awesome-icon :icon="item.icon" /></td>
              <td class="footer-action">
                <EditFooterFollow :footerFollow="item" />
                <DeleteFooterFollow :footerFollow="item" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AddFooter from "./AddFooter.vue";
import AddFooterFollow from "./AddFooterFollow.vue";
import EditFooter from "./EditFooter.vue";
import EditFooterFollow from "./EditFooterFollow.vue";
import DeleteFooterFollow from "./DeleteFooterFollow.vue";
import DeleteFooter from "./DeleteFooter.vue";

import { mapGetters } from "vuex";

export default {
  name: "footer-main",
  components: {
    AddFooter,
    AddFooterFollow,
    EditFooter,
    EditFooterFollow,
    DeleteFooter,
    DeleteFooterFollow,
  },
  computed: {
    ...mapGetters(["itemFooter", "followFooter", "EditFooterFollow"]),
    sortedFooter() {
      return this.sortedFooter2();
    },
    sortedFollow() {
      return this.sortedFollow2();
    },
  },
  data() {
    return {
      footerTable: [
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
          name: "description",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center",
          name: "action",
        },
      ],
      footerFollowTable: [
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
          name: "icon",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center",
          name: "action",
        },
      ],
      //Sort Footer
      currentSort: "id",
      currentSortDir: "asc",
      //Sort Follow
      currentSortFollow: "id",
      currentSortDirFollow: "asc",
    };
  },
  methods: {
    //Sort Footer
    sortFooter: function (s) {
      //  if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    //Sort Follow
    sortFollow: function (s) {
      //  if s == current sort, reverse
      if (s === this.currentSortFollow) {
        this.currentSortDirFollow =
          this.currentSortDirFollow === "asc" ? "desc" : "asc";
      }
      this.currentSortFollow = s;
    },
    //Sort Footer
    sortedFooter2() {
      return this.itemFooter.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    //Sort Follow
    sortedFollow2() {
      return this.followFooter.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDirFollow === "desc") modifier = -1;
        if (a[this.currentSortFollow] < b[this.currentSortFollow])
          return -1 * modifier;
        if (a[this.currentSortFollow] > b[this.currentSortFollow])
          return 1 * modifier;
        return 0;
      });
    },
  },
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

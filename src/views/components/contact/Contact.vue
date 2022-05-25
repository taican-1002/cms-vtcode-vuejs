<template>
  <div class="card mb-4">
    <div class="card-header pb-0 table-header">
      <h1>Contact</h1>
      <AddContact />
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                v-for="item in thTableContact"
                :key="item"
                :class="item.class"
                @click="sort(item.name)"
              >
                {{ item.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedContact" :key="item.id">
              <td class="table-id">
                {{ item.id }}
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.description }}</td>
              <td class="table-action">
                <EditContact :contact="item" />
                <DeleteContact :contact="item" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="card mb-4">
    <div class="card-header pb-0 table-header">
      <h1>Contact Info</h1>
      <!-- <AddContact /> -->
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                v-for="item in thTableContactInfo"
                :key="item"
                :class="item.class"
                @click="sortInfo(item.name)"
              >
                {{ item.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedInfo" :key="item.id">
              <td class="table-id">
                {{ item.id }}
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.content }}</td>

              <td class="table-action">
                <EditContactInfo :contactInfo="item" />
                <!-- <DeleteContact :contact="item" /> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AddContact from "./AddContact.vue";
import EditContact from "./EditContact.vue";
import EditContactInfo from "./EditContactInfo.vue";
import DeleteContact from "./DeleteContact.vue";
import { mapGetters } from "vuex";

export default {
  name: "contact-dashboard",

  components: {
    AddContact,
    EditContact,
    EditContactInfo,
    DeleteContact,
  },
  computed: {
    ...mapGetters(["contacts", "contactInfos"]),
    sortedContact() {
      return this.sortedContact2();
    },
    sortedInfo() {
      return this.sortedInfo2();
    },
  },
  data() {
    return {
      thTableContact: [
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
          name: "phone",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "email",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "description",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2",
          name: "action",
        },
      ],
      thTableContactInfo: [
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
          name: "content",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2",
          name: "action",
        },
      ],
      //Sort Contact
      currentSort: "id",
      currentSortDir: "asc",
      //Sort Info
      currentSortInfo: "id",
      currentSortDirInfo: "asc",

      currentPage: 1,
    };
  },
  methods: {
    //Sort Contact
    sort: function (s) {
      //  if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    //Sort Info
    sortInfo: function (s) {
      //  if s == current sort, reverse
      if (s === this.currentSortInfo) {
        this.currentSortDirInfo =
          this.currentSortDirInfo === "asc" ? "desc" : "asc";
      }
      this.currentSortInfo = s;
    },
    //Sort Contact
    sortedContact2() {
      return this.contacts.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    //Sort Info
    sortedInfo2() {
      return this.contactInfos.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDirInfo === "desc") modifier = -1;
        if (a[this.currentSortInfo] < b[this.currentSortInfo])
          return -1 * modifier;
        if (a[this.currentSortInfo] > b[this.currentSortInfo])
          return 1 * modifier;
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
  text-align: center;
}
.contact__img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}
</style>

<template>
  <div class="card mb-4 px-2">
    <div class="card-header pb-3 blog-post__heading">
      <h1>Blog</h1>
      <AddBlog />
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <tableCommon>
        <template v-slot:tableThead>
          <th
            v-for="item in blogTable"
            :key="item"
            :class="item.class"
            @click="sort(item.name)"
          >
            {{ item.name }}
          </th>
        </template>
        <template v-slot:tableTbody>
          <tr v-for="item in sortedBlog" :key="item.id">
            <td>
              <div class="d-flex px-2 py-1 blog-post__id">
                {{ item.id }}
              </div>
            </td>
            <td class="blog-post__title">
              <p class="text-lg font-weight-bold mb-0">
                {{ item.title }}
              </p>
            </td>

            <td class="align-middle text-sm">
              {{ item.category.name }}
            </td>
            <td class="align-middle">
              {{ item.seo }}
            </td>
            <td class="align-middle">{{ item.author.role }}</td>
            <td class="align-middle">
              <img :src="item.image" alt="" class="blog-post__img" />
            </td>
            <td class="align-middle">
              <span class="text-secondary text-xs font-weight-bold">{{
                item.createDate
              }}</span>
            </td>
            <td>
              <div class="form-check form-switch blog-post__isPin">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  :checked="item.isPin"
                  @change="handleToggleIsPin(item)"
                />
              </div>
            </td>
            <td class="align-middle text-center">
              <EditBlog :blog="item" />
              <DeleteBlog :blog="item" />
            </td>
          </tr>
        </template>
      </tableCommon>
      <div>
        {{ isPinBlog }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

import AddBlog from "./AddBlog.vue";
import EditBlog from "./EditBlog.vue";
import DeleteBlog from "./DeleteBlog.vue";

import Table from "../../../../components/common/Table.vue";

export default {
  name: "blog-dashboard",
  data() {
    return {
      blogTable: [
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7",
          name: "id",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "title",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "category",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "seo",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "author",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "image",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2",
          name: "createDate",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs text-center font-weight-bolder opacity-7 ps-2",
          name: "isPin",
        },
        {
          class:
            "text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2",
          name: "action",
        },
      ],
      //Sort Blog
      currentSort: "id",
      currentSortDir: "asc",
    };
  },
  methods: {
    ...mapActions(["isPinBlogAction"]),
    handleToggleIsPin(item) {
      return this.isPinBlogAction(item);
    },
    //Sort Blog
    sort: function (s) {
      //  if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    //Sort Blog
    sortedBlog2() {
      return this.blogs.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
  },
  computed: {
    ...mapGetters(["blogs", "isPinBlog"]),
    sortedBlog() {
      return this.sortedBlog2();
    },
  },
  components: { AddBlog, EditBlog, DeleteBlog, tableCommon: Table },
};
</script>
<style scoped>
.blog-post__heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.blog-post__id {
  padding: 0.75rem 1rem !important;
}
/* .blog-post__title {
  max-width: 20rem;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: break-spaces;
} */
/* .blog-post__title p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
} */
.blog-post__img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  object-fit: contain;
}
.blog-post__isPin {
  display: flex;
  justify-content: center;
}
</style>

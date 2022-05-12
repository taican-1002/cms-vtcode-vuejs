<template>
  <div class="card mb-4 px-2">
    <div class="card-header pb-3 blog-post__heading">
      <h1>Blog</h1>
      <AddBlog />
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
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
                TITLE
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                CATEGORY
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                AUTHOR
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                IMAGE
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                CREATE DATE
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in blogs" :key="item.id">
              <td>
                <div class="d-flex px-2 py-1 blog-post__id">
                  {{ item.id }}
                  <!-- <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">John Michael</h6>
                    <p class="text-xs text-secondary mb-0">
                      john@creative-tim.com
                    </p>
                  </div> -->
                </div>
              </td>
              <td class="blog-post__title">
                <p class="text-lg font-weight-bold mb-0">
                  {{ item.title }}
                </p>
              </td>

              <td class="align-middle text-center text-sm">
                {{ item.category.name }}
              </td>
              <td class="align-middle text-center">{{ item.author }}</td>
              <td class="align-middle text-center">
                <img :src="item.image" alt="" class="blog-post__img" />
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  item.createDate
                }}</span>
              </td>
              <td class="align-middle text-center">
                <EditBlog :blog="item" />
                <DeleteBlog :blog="item" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddBlog from "./AddBlog.vue";
import EditBlog from "./EditBlog.vue";
import DeleteBlog from "./DeleteBlog.vue";

export default {
  name: "blog-dashboard",
  computed: mapGetters(["blogs"]),
  components: { AddBlog, EditBlog, DeleteBlog },
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
.blog-post__title {
  max-width: 20rem;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: break-spaces;
}
/* .blog-post__title p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
} */
.blog-post__img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}
</style>

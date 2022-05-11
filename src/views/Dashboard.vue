<template>
  <div class="container-fluid mt-4">
    <div class="row align-items-center">
      <div class="col-lg-12 col-sm-12">
        <!-- Tab -->
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li
            class="nav-item"
            role="presentation"
            v-for="item in tabItem"
            :key="item.id"
          >
            <button
              :class="item.class"
              :id="item.id"
              data-bs-toggle="pill"
              :data-bs-target="item.dataBstarget"
              type="button"
              role="tab"
              :aria-controls="item.ariaControls"
              :aria-selected="item.ariaSelected"
            >
              {{ item.name }}
            </button>
          </li>
        </ul>
        <!-- Tab Item -->
        <div class="tab-content" id="pills-tabContent">
          <div
            v-for="item in tabPanel"
            :key="item.id"
            :class="item.class"
            :id="item.id"
            role="tabpanel"
            :aria-labelledby="item.ariaLabelledby"
          >
            <component :is="item.tabPanelItem"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "./components/blog/BlogPost.vue";
import Category from "./components/category/Category.vue";
import Staff from "./components/staff/Staff.vue";
import Partner from "./components/partner/Partner.vue";

export default {
  name: "blog-post",
  components: {
    BlogPost,
    Category,
    Staff,
    Partner,
  },
  data() {
    return {
      tabItem: [
        {
          name: "Category",
          id: "pills-category-tab",
          class: "nav-link active",
          dataBstarget: "#pills-category",
          ariaControls: "pills-category",
          ariaSelected: "true",
        },
        {
          name: "Blog",
          id: "pills-blog-tab",
          class: "nav-link",
          dataBstarget: "#pills-blog",
          ariaControls: "pills-blog",
          ariaSelected: "false",
        },
        {
          name: "Staff",
          id: "pills-staff-tab",
          class: "nav-link",
          dataBstarget: "#pills-staff",
          ariaControls: "pills-staff",
          ariaSelected: "false",
        },
        {
          name: "Partner",
          id: "pills-partner-tab",
          class: "nav-link",
          dataBstarget: "#pills-partner",
          ariaControls: "pills-partner",
          ariaSelected: "false",
        },
        {
          name: "Contact",
          id: "pills-contact-tab",
          class: "nav-link",
          dataBstarget: "#pills-contact",
          ariaControls: "pills-contact",
          ariaSelected: "false",
        },
      ],
      tabPanel: [
        {
          id: "pills-category",
          class: "tab-pane fade show active",
          ariaLabelledby: "pills-category-tab",
          tabPanelItem: "Category",
        },
        {
          id: "pills-blog",
          class: "tab-pane fade ",
          ariaLabelledby: "pills-blog-tab",
          tabPanelItem: "BlogPost",
        },
        {
          id: "pills-staff",
          class: "tab-pane fade ",
          ariaLabelledby: "pills-staff-tab",
          tabPanelItem: "Staff",
        },
        {
          id: "pills-partner",
          class: "tab-pane fade ",
          ariaLabelledby: "pills-partner-tab",
          tabPanelItem: "Partner",
        },
        {
          id: "pills-contact",
          class: "tab-pane fade",
          ariaLabelledby: "pills-contact-tab",
          tabPanelItem: "Contact",
        },
      ],
    };
  },
};
</script>

<style scoped>
.nav-link.active {
  background-image: linear-gradient(
    310deg,
    #141727 0%,
    #3a416f 100%
  ) !important;
  color: white !important;
}
</style>

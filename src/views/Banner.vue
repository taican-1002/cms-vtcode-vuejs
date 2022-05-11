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
            {{ item.tabPanelItem }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import BannerMain from "./components/banner/BannerMain.vue";
export default {
  name: "banner",
  // components: { BannerMain },
  data() {
    return {
      tabItem: [
        {
          name: "Image",
          id: "pills-image-tab",
          class: "nav-link active",
          dataBstarget: "#pills-image",
          ariaControls: "pills-image",
          ariaSelected: "true",
        },
        {
          name: "Slogan",
          id: "pills-slogan-tab",
          class: "nav-link",
          dataBstarget: "#pills-slogan",
          ariaControls: "pills-slogan",
          ariaSelected: "false",
        },
        {
          name: "Color",
          id: "pills-color-tab",
          class: "nav-link",
          dataBstarget: "#pills-color",
          ariaControls: "pills-color",
          ariaSelected: "false",
        },
        {
          name: "FormText",
          id: "pills-formText-tab",
          class: "nav-link",
          dataBstarget: "#pills-formText",
          ariaControls: "pills-formText",
          ariaSelected: "false",
        },
        {
          name: "Setting",
          id: "pills-setting-tab",
          class: "nav-link",
          dataBstarget: "#pills-setting",
          ariaControls: "pills-setting",
          ariaSelected: "false",
        },
      ],
      tabPanel: [
        {
          id: "pills-image",
          class: "tab-pane fade show active",
          ariaLabelledby: "pills-image-tab",
          tabPanelItem: "<image />",
        },
        {
          id: "pills-slogan",
          class: "tab-pane fade ",
          ariaLabelledby: "pills-slogan-tab",
          tabPanelItem: "<sloganPost />",
        },
        {
          id: "pills-color",
          class: "tab-pane fade ",
          ariaLabelledby: "pills-color-tab",
          tabPanelItem: "<color />",
        },
        {
          id: "pills-formText",
          class: "tab-pane fade ",
          ariaLabelledby: "pills-formText-tab",
          tabPanelItem: "<formText />",
        },
        {
          id: "pills-setting",
          class: "tab-pane fade",
          ariaLabelledby: "pills-setting-tab",
          tabPanelItem: "setting",
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

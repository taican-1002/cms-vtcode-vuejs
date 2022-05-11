<template>
  <ButtonAdd @click="handleOpenModal" />

  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Footer</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="showModal = false"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body modal-body__footer">
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">ID</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="footerItem.id"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  v-model="footerItem.name"
                />
              </div>
              <h5 class="pt-3">Description</h5>
              <div
                class="mb-3"
                v-for="(desItem, index) in footerItem.description"
                :key="index"
              >
                <div class="description-icon" v-if="desItem.icon">
                  Icon: &nbsp;
                  <div
                    v-for="(iconItem, index) in desItem.icon"
                    :key="index"
                    class="description-icon__item"
                  >
                    <font-awesome-icon :icon="iconItem" />
                    &nbsp;
                  </div>
                </div>

                <div v-if="desItem.text">Text: {{ desItem.text }}</div>
              </div>

              <ButtonAdd @click="handleOpenModalDes" class="mb-3" />

              <!-- Modal Description -->
              <div v-if="showModalIcon" class="modal-wrap">
                <div class="modal-mask">
                  <div class="modal-wrapper">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Add Icon</h5>
                          <button
                            type="button"
                            class="close"
                            aria-label="Close"
                            @click="showModalIcon = false"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div>
                            <div class="mb-3">
                              <label class="form-label">Icon</label>
                              <Multiselect
                                class="description-icon"
                                v-model="value"
                                mode="tags"
                                :searchable="true"
                                :createTag="true"
                                :options="options"
                              />
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Text</label>
                              <input
                                type="text"
                                class="form-control description-text"
                                v-model="textDes"
                              />
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                @click="showModalIcon = false"
                              >
                                Close
                              </button>

                              <button
                                type="button"
                                class="btn btn-primary"
                                @click="onSubmitModalDes"
                              >
                                ADD
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="showModal = false"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="onSubmit">
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapActions } from "vuex";
import ButtonAdd from "@/examples/ButtonAction/ButtonAdd.vue";
import Multiselect from "@vueform/multiselect";
import { useToast } from "vue-toastification";

export default {
  name: "AddFooter",
  components: { ButtonAdd, Multiselect },
  setup() {
    // Get toast interface
    const toast = useToast();

    // // Use it!
    // toast("I'm a toast!");

    // // or with options
    // toast.success("My toast content", {
    //   timeout: 2000,
    // });

    return { toast };
  },
  data() {
    return {
      value: null,
      options: ["bicycle", "bell", "bone"],
      footerItem: {
        name: "",
        description: [],
      },
      textDes: "",
      showModal: false,
      showModalIcon: false,
    };
  },

  methods: {
    ...mapActions(["addFooter"]),
    onSubmit() {
      if (
        this.footerItem.name != "" &&
        this.footerItem.name.trim() &&
        this.footerItem.description != []
      ) {
        this.addFooter({
          id: this.footerItem.id,
          name: this.footerItem.name,
          description: this.footerItem.description,
        });
        this.showModal = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
      this.footerItem.id = uuidv4();
      this.footerItem.name = "";
      this.footerItem.description = [];
    },

    onSubmitModalDes() {
      const inputDesText = document.querySelector(".description-text");
      // const inputDesIcon = document.querySelector(".description-icon");
      this.footerItem.description.push({
        icon: this.value,
        text: inputDesText.value,
      });
      this.showModalIcon = false;
    },
    handleOpenModal() {
      this.showModal = true;
      this.footerItem.id = uuidv4();
    },

    handleOpenModalDes() {
      this.showModalIcon = true;
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
.modal-wrap {
  position: absolute;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
/* Important part */
.modal-dialog {
  overflow-y: initial !important;
}
.modal-body__footer {
  height: 80vh;
  overflow-y: auto;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.description-icon {
  display: flex;
}
/* .description-icon__item {
  margin: 0 10px;
} */
</style>

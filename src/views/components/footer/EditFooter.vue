<template>
  <ButtonEdit @click="showModal = true" />

  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Footer</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="showModal = false"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body modal-main__body">
              <div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >ID</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="editItem.id"
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Name</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    required
                    v-model="editItem.name"
                  />
                </div>
                <div class="edit-footer__des">
                  <h5 class="pt-3 text-left">Description</h5>
                  <ButtonAdd @click="handleAddModalDes" class="mb-3" />
                </div>
                <!-- Modal Add Des -->
                <div v-if="showModalAddDes" class="modal-wrap">
                  <div class="modal-mask">
                    <div class="modal-wrapper">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Add Description</h5>
                            <button
                              type="button"
                              class="close"
                              aria-label="Close"
                              @click="showModalAddDes = false"
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
                                  v-model="valueDes"
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
                                  class="form-control add-des__text"
                                />
                              </div>

                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  @click="showModalAddDes = false"
                                >
                                  Close
                                </button>

                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  @click="onSubmitAddModalDes"
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
                <!-- Modal Description -->
                <div v-if="showModalIcon" class="modal-wrap">
                  <div class="modal-mask">
                    <div class="modal-wrapper">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Edit Icon</h5>
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
                                  class="form-control des-text"
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
                                  SAVE
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Modal Delete Des Item -->
                <div v-if="showModalDelete" class="modal-wrap">
                  <div class="modal-mask">
                    <div class="modal-wrapper">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Delete Footer</h5>
                            <button
                              type="button"
                              class="close"
                              aria-label="Close"
                              @click="showModalDelete = false"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <div>
                              <div class="mb-3">
                                Bạn có chắc muốn xóa item này ?
                              </div>

                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  @click="showModalDelete = false"
                                >
                                  Close
                                </button>

                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  @click="handleDeleteModalDes"
                                >
                                  DELETE
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="mb-3 description-content text-left"
                  v-for="(desItem, index) in editItem.description"
                  :key="index"
                >
                  <div class="description-icon">
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

                  <div class="mb-3 description-text">
                    Text: {{ desItem.text }}
                  </div>
                  <ButtonEdit
                    @click="handleOpenModalDes(desItem, index)"
                    class="mb-3 float-left"
                    style="margin-bottom: 1rem !important"
                  />
                  <ButtonDelete @click="handleDeleteDesItem(desItem)" />
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
                SAVE CHANGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ButtonEdit from "@/examples/ButtonAction/ButtonEdit.vue";
import ButtonDelete from "@/examples/ButtonAction/ButtonDelete.vue";
import ButtonAdd from "@/examples/ButtonAction/ButtonAdd.vue";
import Multiselect from "@vueform/multiselect";

export default {
  name: "EditFooter",
  components: { ButtonEdit, ButtonAdd, ButtonDelete, Multiselect },
  data() {
    return {
      itemEditDel: {
        index: 0,
        item: "",
      },
      value: null,
      valueDes: null,
      options: ["bone", "book-open", "certificate", "phone"],
      editItem: {
        id: this.footerItem.id,
        name: this.footerItem.name,
        description: this.footerItem.description,
      },

      textDes: "",
      showModal: false,
      showModalIcon: false,
      showModalAddDes: false,
      showModalDelete: false,
    };
  },
  props: ["footerItem"],
  methods: {
    ...mapActions(["editFooter"]),

    /**Modal */
    onSubmit() {
      this.editFooter(this.editItem);
      this.showModal = false;
    },

    /**Modal */
    handleOpenModalDes(desItem, index) {
      this.showModalIcon = true;
      this.value = desItem.icon;
      this.textDes = desItem.text;
      this.itemEditDel.index = index;
    },
    /**Modal Description  */
    onSubmitAddModalDes() {
      const addDesText = document.querySelector(".add-des__text");
      this.editItem.description.push({
        icon: this.valueDes,
        text: addDesText.value,
      });
      this.showModalAddDes = false;
    },
    /**Modal Description */
    onSubmitModalDes() {
      this.editItem.description[this.itemEditDel.index] = {
        icon: this.value,
        text: this.textDes,
      };
      this.showModalIcon = false;
    },

    /**Modal Add Des */
    handleAddModalDes() {
      this.showModalAddDes = true;
    },
    /**Modal Delete Des Item  */
    handleDeleteDesItem(desItem) {
      this.showModalDelete = true;
      this.itemEditDel.item = desItem.text;
    },
    handleDeleteModalDes() {
      this.showModalDelete = false;
      const delDesItem = this.editItem.description.filter(
        (item) => item.text != this.itemEditDel.item
      );
      this.editItem.description = delDesItem;
    },
  },
};
</script>

<style scoped>
.text-left {
  text-align: left;
}
.float-left {
  float: left;
}
.mr-2 {
  margin-right: 1rem;
}
.modal-wrap,
.modal-content {
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

.modal-wrapper {
  display: table-cell;
  /* vertical-align: middle; */
}
/* Important part */
.modal-dialog {
  overflow-y: initial !important;
  margin: 0.75rem auto !important;
}
.modal-main__body {
  height: 80vh;
  overflow-y: auto;
}
.form-label {
  float: left;
}
.edit-footer__des {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.description-icon {
  display: flex;
}
.description-content {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.description-text {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

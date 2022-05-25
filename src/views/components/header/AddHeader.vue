<template>
  <ButtonAdd @click="handleAddModalHeader" />
  <!-- Modal Header -->
  <div v-if="showModalAddHeader" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Item</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="handleCloseModalHeader"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label"
                  >Name <span style="color: #ff0000">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  required
                  v-model="header.name"
                />
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="showModalAddHeader = false"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="onAddModalHeader"
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
</template>

<script>
import { mapActions } from "vuex";
import ButtonAdd from "@/examples/ButtonAction/ButtonAdd.vue";
import noImage from "../../../assets/img/no-image.png";
import { useToast } from "vue-toastification";

export default {
  name: "AddHeader",
  components: { ButtonAdd },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      header: {
        name: "",
      },

      showModalAddHeader: false,
    };
  },
  methods: {
    ...mapActions(["addHeader"]),
    /**Header Item */
    onAddModalHeader(e) {
      e.preventDefault();
      if (this.header.name != "" && this.header.name.trim()) {
        this.addHeader({
          id: this.header.id,
          name: this.header.name,
        });
        this.showModalAddHeader = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }

      this.previewImage = noImage;
      this.header.name = "";
    },
    handleAddModalHeader() {
      this.showModalAddHeader = true;
    },
    handleCloseModalHeader() {
      this.showModalAddHeader = false;
    },
  },
};
</script>

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

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-dialog {
  overflow-y: initial !important;
}
.modal-body {
  /* height: 80vh; */
  overflow-y: auto;
}
</style>

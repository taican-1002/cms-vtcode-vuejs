<template>
  <ButtonDelete @click="handleDelete" />
  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Logo</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="showModal = false"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="mb-3">Bạn có chắc muốn xóa logo này ?</div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="showModal = false"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="handleDeleteLogo"
              >
                DELETE
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
import ButtonDelete from "@/examples/ButtonAction/ButtonDelete";

export default {
  name: "DeleteLogo",
  components: { ButtonDelete },
  data() {
    return {
      logoDelete: {
        id: this.logo.id,
        name: this.logo.name,
        img: this.logo.img,
      },
      showModal: false,
    };
  },
  props: ["logo"],
  methods: {
    ...mapActions(["deleteLogo"]),
    handleDelete() {
      this.showModal = true;
    },
    handleDeleteLogo(e) {
      e.preventDefault();
      this.deleteLogo(this.logoDelete);
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
</style>

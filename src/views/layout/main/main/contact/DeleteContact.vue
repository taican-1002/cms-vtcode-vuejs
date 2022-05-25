<template>
  <ButtonDelete @click="handleDelete" />
  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Contact</h5>
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
              <div class="mb-3">Bạn có chắc muốn xóa contact này ?</div>
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
                @click="handleDeleteContact"
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
  name: "DeleteContact",
  components: { ButtonDelete },
  data() {
    return {
      contactDelete: {
        id: this.contact.id,
        name: this.contact.name,
        phone: this.contact.phone,
        email: this.contact.email,
        description: this.contact.description,
      },
      showModal: false,
    };
  },
  props: ["contact"],
  methods: {
    ...mapActions(["deleteContact"]),
    handleDelete() {
      this.showModal = true;
    },
    handleDeleteContact() {
      this.deleteContact(this.contactDelete);
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

<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header
      ><h5 class="modal-title">Delete Staff</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showModal = false"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>
    <template v-slot:body
      ><div class="mb-3">Bạn có chắc muốn xóa staff này ?</div>
    </template>
    <template v-slot:footer
      ><button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="handleDeleteStaff">
        DELETE
      </button>
    </template>
  </modalSmall>
</template>

<script>
import { mapActions } from "vuex";
import ButtonDelete from "@/examples/ButtonAction/ButtonDelete";
import ModalSmall from "../../../../components/common/ModalSmall.vue";
export default {
  name: "DeleteStaff",
  components: { ButtonDelete, modalSmall: ModalSmall },
  data() {
    return {
      staffDelete: {
        id: this.staff.id,
        name: this.staff.name,
        position: this.staff.position,
        office: this.staff.office,
      },
      showModal: false,
    };
  },
  props: ["staff"],
  methods: {
    ...mapActions(["deleteStaff"]),
    handleDelete() {
      this.showModal = true;
    },
    handleDeleteStaff(e) {
      e.preventDefault();
      this.deleteStaff(this.staffDelete);
    },
  },
};
</script>

<style scoped></style>

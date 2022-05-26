<template>
  <ButtonDelete @click="handleDelete" />

  <modalSmall v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Delete User</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="showModal = false"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
    <template v-slot:body>
      <div class="mb-3">Bạn có chắc muốn xóa user này ?</div>
    </template>
    <template v-slot:footer
      ><button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button type="button" @click="handleDeleteUser" class="btn btn-primary">
        DELETE
      </button>
    </template>
  </modalSmall>
</template>

<script>
import { mapActions } from "vuex";
import ButtonDelete from "@/views/components/common/ButtonAction/ButtonDelete";
import ModalSmall from "../../../../components/common/ModalSmall.vue";
export default {
  name: "DeleteUser",
  components: {
    ButtonDelete,
    modalSmall: ModalSmall,
  },
  data() {
    return {
      deleteUser: {
        id: this.user.id,
        email: this.user.email,
        password: this.user.password,
      },
      showModal: false,
    };
  },
  props: ["user"],
  methods: {
    ...mapActions(["deleteUserAction"]),
    handleDelete() {
      this.showModal = true;
      console.log(this.user);
    },
    handleDeleteUser(e) {
      e.preventDefault();
      console.log(this.deleteUser);
      this.deleteUserAction(this.deleteUser);
    },
  },
};
</script>

<style scoped></style>

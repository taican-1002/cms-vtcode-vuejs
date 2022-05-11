<template>
  <ButtonDelete @click="handleDelete" />
  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete User</h5>
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
              <form @submit="handleDeleteUser">
                <div class="mb-3">Bạn có chắc muốn xóa user này ?</div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="showModal = false"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">DELETE</button>
                </div>
              </form>
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
  name: "DeleteUser",
  components: { ButtonDelete },
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

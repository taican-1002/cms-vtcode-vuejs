<template>
  <ButtonEdit @click="handleEdit" />
  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit User</h5>
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
              <form @submit="handleSaveEdit">
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >ID</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="editUser.id"
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Email address</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    required
                    v-model="editUser.email"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Password</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="editUser.password"
                    required
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="showModal = false"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    SAVE CHANGE
                  </button>
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
import ButtonEdit from "@/examples/ButtonAction/ButtonEdit.vue";

export default {
  name: "EditUser",
  components: { ButtonEdit },
  data() {
    return {
      editUser: {
        id: this.user.id,
        email: this.user.email,
        password: this.user.password,
      },
      showModal: false,
    };
  },
  props: ["user"],
  methods: {
    ...mapActions(["editUserAction"]),
    handleEdit() {
      this.showModal = true;
    },
    handleSaveEdit(e) {
      e.preventDefault();
      // console.log(this.editUser);
      this.editUserAction(this.editUser);
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.mr-2 {
  margin-right: 1rem;
}
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

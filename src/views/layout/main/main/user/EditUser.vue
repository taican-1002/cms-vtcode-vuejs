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
                @click="handleCloseEdit"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">ID</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="editUser.id"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Email address <span style="color: #ff0000">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  required
                  v-model="editUser.email"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Password <span style="color: #ff0000">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="editUser.password"
                  required
                />
              </div>
              <div class="mb-3 text-left">
                <label class="form-label"
                  >Role <span style="color: #ff0000">*</span></label
                >
                <select
                  class="form-select form-role"
                  id="validationDefault04"
                  required
                >
                  <option disabled value="">Select Role</option>
                  <option
                    v-for="item in roleUser"
                    class="select-option"
                    :key="item.id"
                    :value="item.id"
                    :selected="item.id === editUser.role.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="handleCloseEdit"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="handleSaveEdit"
              >
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
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "EditUser",
  components: { ButtonEdit },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      editUser: {
        id: this.user.id,
        email: this.user.email,
        password: this.user.password,
        role: this.user.role,
      },
      showModal: false,
    };
  },
  props: ["user"],
  computed: mapGetters(["roleUser"]),
  methods: {
    ...mapActions(["editUserAction"]),
    handleEdit() {
      this.showModal = true;
    },
    handleCloseEdit() {
      this.showModal = false;
      this.editUser.email = this.user.email;
      this.editUser.password = this.user.password;
      this.editUser.role = this.user.role;
    },
    handleSaveEdit() {
      const formRoleUser = document.querySelector(".form-role");
      const objRoleUser = this.roleUser.filter(
        (item) => item.id == formRoleUser.value
      );
      this.editUser.role = objRoleUser[0];
      const regexMail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
      const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (this.editUser.password != "" && this.editUser.password.trim()) {
        if (regexMail.test(this.editUser.email)) {
          if (regexPass.test(this.editUser.password)) {
            this.editUserAction(this.editUser);
            localStorage.setItem("userLogin", JSON.stringify(this.editUser));
            this.showModal = false;
          } else {
            this.toast.warning("Password invalid");
          }
        } else {
          this.toast.warning("Email invalid");
        }
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin");
      }
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

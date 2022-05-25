<template>
  <ButtonAdd @click="handleToggleModal" />
  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add User</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="handleChange"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label"
                  >Email address <span style="color: #ff0000">*</span></label
                >
                <input
                  type="text"
                  class="form-control form-email"
                  required
                  v-model="user.email"
                />
              </div>
              <div class="mb-3">
                <label class="form-label"
                  >Password <span style="color: #ff0000">*</span></label
                >
                <input
                  type="password"
                  class="form-control"
                  v-model="user.password"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label"
                  >Role <span style="color: #ff0000">*</span></label
                >
                <select class="form-select form-role" required>
                  <option selected disabled value="">Select Role</option>
                  <option
                    v-for="item in roleUser"
                    :key="item.id"
                    :value="item.name"
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
import { mapActions } from "vuex";
import ButtonAdd from "@/examples/ButtonAction/ButtonAdd.vue";
import { useToast } from "vue-toastification";
import { mapGetters } from "vuex";

export default {
  name: "AddUser",
  components: { ButtonAdd },

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
      user: {
        id: "",
        email: "",
        password: "",
        role: {},
      },
      showModal: false,
    };
  },
  computed: mapGetters(["roleUser"]),
  methods: {
    ...mapActions(["addUser"]),
    onSubmit(e) {
      e.preventDefault();
      const formRole = document.querySelector(".form-role");
      const objRoleUser = this.roleUser.filter(
        (item) => item.name == formRole.value
      );
      if (
        this.user.email != "" &&
        this.user.email.trim() &&
        this.user.password != "" &&
        this.user.password.trim() &&
        formRole.value != ""
      ) {
        const regexMail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (regexMail.test(this.user.email)) {
          if (regexPass.test(this.user.password)) {
            this.addUser({
              id: this.user.id,
              email: this.user.email.toLowerCase(),
              password: this.user.password,
              role: objRoleUser[0],
            });
            this.showModal = false;
            const userLocal = JSON.parse(localStorage.getItem("user"));
            userLocal.push(this.user);
            localStorage.setItem("user", JSON.stringify(userLocal));
            this.user.id = "";
            this.user.email = "";
            this.user.password = "";
            formRole.value = "";
            this.user.role = {};
          } else {
            this.toast.warning("Password invalidate");
          }
        } else {
          this.toast.warning("Email invalidate");
        }
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
    },
    handleToggleModal() {
      this.showModal = true;
    },
    handleChange() {
      this.showModal = false;
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

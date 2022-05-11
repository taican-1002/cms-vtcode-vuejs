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
                <label for="exampleInputPassword1" class="form-label">ID</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.id"
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
                  v-model="user.email"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  v-model="user.password"
                  required
                />
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
import { v4 as uuidv4 } from "uuid";
import { mapActions } from "vuex";
import ButtonAdd from "@/examples/ButtonAction/ButtonAdd.vue";
import { useToast } from "vue-toastification";

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
        email: "",
        password: "",
      },
      showModal: false,
    };
  },
  methods: {
    ...mapActions(["addUser"]),
    onSubmit(e) {
      e.preventDefault();
      if (
        this.user.email != "" &&
        this.user.email.trim() &&
        this.user.password != "" &&
        this.user.password.trim()
      ) {
        this.addUser({
          id: this.user.id,
          email: this.user.email,
          password: this.user.password,
        });
        this.showModal = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
      this.user.id = uuidv4();
      this.user.email = "";
      this.user.password = "";
    },
    handleToggleModal() {
      this.showModal = true;
      this.user.id = uuidv4();
    },
    handleChange() {
      this.showModal = false;
      this.user.id = uuidv4();
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

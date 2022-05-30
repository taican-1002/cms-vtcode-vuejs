<template>
  <ButtonAdd @click="handleToggleModal" />

  <modal v-if="showModal">
    <template v-slot:header>
      <h5 class="modal-title">Add User</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="handleChange"
      >
        <span aria-hidden="true">&times;</span>
      </button></template
    >
    <template v-slot:body>
      <div class="mb-3">
        <label class="form-label"
          >Username <span style="color: #ff0000">*</span></label
        >
        <input
          type="text"
          class="form-control form-username"
          required
          v-model="user.username"
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
          <option v-for="item in roleUser" :key="item.id" :value="item.name">
            {{ item.name }}
          </option>
        </select>
      </div>
    </template>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="showModal = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="onSubmit">
        ADD
      </button></template
    >
  </modal>
</template>

<script>
import { mapActions } from "vuex";
import ButtonAdd from "@/views/components/common/ButtonAction/ButtonAdd.vue";
import { useToast } from "vue-toastification";
import { mapGetters } from "vuex";
import Modal from "../../../../components/common/Modal.vue";
export default {
  name: "AddUser",
  components: { ButtonAdd, modal: Modal },

  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      user: {
        id: "",
        username: "",
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
        this.user.username != "" &&
        this.user.username.trim() &&
        this.user.password != "" &&
        this.user.password.trim() &&
        formRole.value != ""
      ) {
        // const regexMail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        const regexUsername = /^[a-zA-Z0-9]{1,}$/;
        const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (regexUsername.test(this.user.username)) {
          if (regexPass.test(this.user.password)) {
            this.addUser({
              id: this.user.id,
              username: this.user.username.toLowerCase(),
              password: this.user.password,
              role: objRoleUser[0],
            });
            this.showModal = false;
            const userLocal = JSON.parse(localStorage.getItem("user"));
            userLocal.push(this.user);
            localStorage.setItem("user", JSON.stringify(userLocal));
            this.user.id = "";
            this.user.username = "";
            this.user.password = "";
            formRole.value = "";
            this.user.role = {};
          } else {
            this.toast.warning("Password invalidate");
          }
        } else {
          this.toast.warning("Username invalidate");
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

<style scoped></style>

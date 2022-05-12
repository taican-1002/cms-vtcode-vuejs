<template>
  <ButtonAdd @click="handleToggleModal" />
  <!-- Modal -->
  <div v-if="showModal" class="modal-wrap">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Staff</h5>
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
                <label class="form-label">ID</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="staff.id"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Avatar</label>
                <div class="mb-3">
                  <div
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Avatar Preview
                  </div>
                  <img :src="previewImage" class="add-staff__img" />
                </div>
                <input
                  type="file"
                  class="form-control"
                  accept="image/*"
                  @change="uploadImage"
                  id="file-input"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  required
                  v-model="staff.name"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Position</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="staff.position"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Office</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="staff.office"
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
                <button type="button" class="btn btn-primary" @click="onSubmit">
                  ADD
                </button>
              </div>
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
import noAvatar from "../../../assets/img/no-avatar.png";
import { useToast } from "vue-toastification";

export default {
  name: "AddStaff",
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
      staff: {
        name: "",
        position: "",
        office: "",
      },
      showModal: false,
      previewImage: noAvatar,
    };
  },
  methods: {
    ...mapActions(["addStaff"]),
    onSubmit(e) {
      e.preventDefault();
      if (
        this.staff.name != "" &&
        this.staff.name.trim() &&
        ((this.staff.position != "" && this.staff.position.trim()) ||
          (this.staff.office != "" && this.staff.office.trim()))
      ) {
        this.addStaff({
          id: this.staff.id,
          avatar: this.previewImage,
          name: this.staff.name,
          position: this.staff.position,
          office: this.staff.office,
        });
        this.showModal = false;
      } else {
        this.toast.error("Vui lòng điền đầy đủ thông tin!");
      }
      const inputFile = document.querySelector("#file-input");
      inputFile.value = "";

      this.staff.id = uuidv4();
      this.previewImage = noAvatar;
      this.staff.name = "";
      this.staff.position = "";
      this.staff.office = "";
    },
    handleToggleModal() {
      this.showModal = true;
      this.staff.id = uuidv4();
    },
    handleChange() {
      this.showModal = false;
      this.staff.id = uuidv4();
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
    },
    currentDateTime() {
      const current = new Date();
      const date =
        current.getDate() +
        "/" +
        (current.getMonth() + 1) +
        "/" +
        current.getFullYear();
      //   const time =
      //     current.getHours() +
      //     ":" +
      //     current.getMinutes() +
      //     ":" +
      //     current.getSeconds();
      //   const dateTime = date + " " + time;
      const dateTime = date;

      return dateTime;
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
.modal-dialog {
  overflow-y: initial !important;
}
.modal-body {
  height: 80vh;
  overflow-y: auto;
}
.add-staff__img {
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  display: flex;
  margin: auto;
}
@media only screen and (max-width: 600px) {
  .add-staff__img {
    width: 14rem;
    height: 14rem;
  }
}
</style>

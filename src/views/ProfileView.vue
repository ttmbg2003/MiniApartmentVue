<template>
  <div style="height: 100%; background: #f5f6f8; padding-top: 28px">
    <div class="container">
      <div
        style="
          display: flex;
          padding-top: 20px;
          padding-left: 5rem;
          align-items: center;
          height: 20%;
        "
      >
        <!-- <spam><input type="file"><img class="avartar-img" src="../components/icons/minh.jpg"></spam> -->
        <input type="file" id="fileInput" style="display: none" />
        <img
          v-bind:src="localUser.image"
          class="avartar-img"
          alt="Click to upload"
          id="image"
          style="cursor: pointer"
        />
        <div>
          <h1>{{ fullNameRaw || "null" }}</h1>
          <p style="margin: 0">{{ emailRaw || "null" }}</p>
        </div>
        <div style="display: flex; flex: 0%; justify-content: flex-end">
          <button class="btn btn-edit-profile">Edit my profile</button>
          <button
            class="btn btn-change-password"
            data-bs-toggle="modal"
            data-bs-target="#changePassModal"
          >
            Change password
          </button>
        </div>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="changePassModal"
        tabindex="-1"
        aria-labelledby="changePassModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header" style="justify-content: center">
              <h4 class="modal-title" id="changePassModalLabel">
                Change Password
              </h4>
              <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
            </div>
            <form @submit.prevent="submitFormChangePassword">
              <div class="modal-body">
                <div class="form-group">
                  <label>Email Address<span style="color: red">*</span></label>
                  <input
                    class="input-change-pass"
                    type="email"
                    v-model="emailRaw"
                    readonly
                  />
                </div>
                <div class="form-group">
                  <label
                    >Current Password<span style="color: red">*</span></label
                  >
                  <input
                    :type="showCurrentPassword ? 'text' : 'password'"
                    class="input-change-pass is-valid"
                    v-model="currentPasswordChange"
                    required
                  />
                  <i
                    :class="
                      showCurrentPassword ? 'fa fa-eye' : 'fa fa-eye-slash'
                    "
                    class="eye-icon"
                    @click="showCurrentPassword = !showCurrentPassword"
                    style=""
                  ></i>
                  <div class="invalid-feedback">Looks good!</div>
                </div>
                <div class="form-group">
                  <label>New Password<span style="color: red">*</span></label>
                  <input
                    class="input-change-pass"
                    v-model="password"
                    :type="showNewPassword ? 'text' : 'password'"
                    id="password"
                    required
                  />
                  <i
                    :class="showNewPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
                    class="eye-icon"
                    @click="showNewPassword = !showNewPassword"
                  ></i>
                </div>
                <div class="form-group">
                  <label
                    >Confirm New Password<span style="color: red"
                      >*</span
                    ></label
                  >
                  <input
                    class="input-change-pass"
                    id="password-repeat"
                    v-model="passwordRepeat"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    required
                  />
                  <i
                    :class="
                      showConfirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'
                    "
                    class="eye-icon"
                    @click="showConfirmPassword = !showConfirmPassword"
                  ></i>
                </div>
                <ul class="requirements">
                  <li
                    v-for="(requirement, key) in passwordRequirements"
                    :key="key"
                    :class="requirement.predicate ? 'is-success' : 'is-error'"
                  >
                    {{ requirement.name }}
                  </li>
                </ul>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-cancel"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-save"
                  :disabled="!allRequirementsMet"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="card">
        <div>
          <form @submit.prevent="submitForm">
            <div style="display: flex">
              <div class="form-group">
                <label for="fullName">Full Name</label>
                <input
                  class="input-user-info"
                  type="text"
                  id="fullName"
                  v-model="fullNameRaw"
                  disabled
                />
              </div>
              <div class="form-group">
                <label>Gender</label>
                <select
                  class="input-user-info"
                  name="gender"
                  v-model="localUser.gender"
                >
                  <option selected disabled value="">Select</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Others</option>
                </select>
              </div>
            </div>
            <div style="display: flex">
              <div class="form-group">
                <label>Date Of Birth</label>
                <input
                  class="input-user-info"
                  type="date"
                  v-model="localUser.dateOfBirth"
                  required
                />
              </div>
              <div class="form-group">
                <label>Id Number</label>
                <input
                  class="input-user-info"
                  type="text"
                  pattern="^[0-9]{12}$"
                  v-model="localUser.citizenId"
                />
              </div>
            </div>
            <div class="form-group">
              <label>Place Of Permanent</label>
              <input
                class="input-user-info"
                type="text"
                v-model="localUser.placeOfPermanet"
                style="width: 98%"
                placeholder="Your place of permanet"
              />
            </div>
            <div style="display: flex">
              <div class="form-group">
                <label>Email Address</label>
                <input
                  class="input-user-info"
                  type="email"
                  v-model="localUser.email"
                  disabled
                />
              </div>
              <div class="form-group">
                <label>Contact Number</label>

                <input
                  type="text"
                  name="phone"
                  class="input-user-info"
                  v-model="localUser.contact"
                  pattern="^[0-9]{10}$"
                  placeholder="Nhập số điện thoại của bạn"
                />
              </div>
            </div>
            <div
              style="display: flex; justify-content: center; margin-right: 5%"
            >
              <button class="btn btn-cancel" type="button" @click="cancelEdit">
                Go to home
              </button>
              <button class="btn btn-save" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { User } from "@/type/User";
import userService from "@/services/userService";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const localUser = ref<User>({
  userId: "",
  firstName: "",
  lastName: "",
  gender: 0,
  dateOfBirth: "",
  placeOfPermanet: "",
  email: "",
  contact: "",
  password: "",
  roleId: 0,
  image: "",
  citizenId: 0,
});
const router = useRouter();
var emailRaw = userService.getEmailCurrentUser();
var fullNameRaw = "";
userService.getUserByEmail(emailRaw).then((response) => {
  localUser.value = response;
  localUser.value.dateOfBirth = formatDate(response.dateOfBirth);
  // localUser.value = { ...response, dateOfBirth: formatDate(response.dateOfBirth) };
  console.log(response);

  fullNameRaw = `${localUser.value.firstName} ${localUser.value.lastName}`;
});
const formatDate = (dateString: string) => {
  if (dateString == null) {
    return null;
  }
  return dateString.split("T")[0];
};
const timeFomat = (dateString: string) => {
  return dateString + "T17:00:00.000+00:00";
};
const submitForm = () => {
  localUser.value.dateOfBirth = timeFomat(localUser.value.dateOfBirth);
  userService.editProfile(localUser.value).then((res) => {
    console.log(res);

    if (res == "update success") {
      Swal.fire({
        title: "Success!",
        text: "Save successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      Swal.fire({
        title: "Fail!",
        text: "Save fail.",
        icon: "error",
        showConfirmButton: true,
      });
    }
  });
};
const cancelEdit = () => {
  router.push({ name: "home" });
};
function init() {
  const fileInput = document.getElementById("fileInput") as HTMLInputElement;
  const image = document.getElementById("image") as HTMLImageElement;

  if (fileInput && image) {
    image.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", async (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const selectedFile = target.files[0];
        console.log("File đã chọn:", selectedFile.name);
        try {
          const fileUrl = await userService.uploadImage(selectedFile, emailRaw);
          localUser.value.image = fileUrl;
          console.log("File uploaded successfully:", fileUrl);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    });
  }
}

var emailChangePass = "";
var currentPasswordChange = "";

const password = ref("");
const passwordRepeat = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const submitFormChangePassword = () => {
  return userService
    .changePassword(emailRaw, currentPasswordChange, password.value)
    .then((response) => {
      if (response == "wrong password") {
        Swal.fire({
          icon: "error",
          text: "Wrong password",
          showConfirmButton: true,
        });
      }

      if (response != "wrong password") {
        Swal.fire({
          icon: "success",
          text: "Success",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
};
const showConfirmPassword = ref(false);
const passwordRequirements = computed(() => [
  {
    name: "Please choose a strong password that include at least 1 lowercase and uppercase letter, a number, as well as a special character(!@#$%^&*)",
    predicate:
      password.value.toLowerCase() !== password.value &&
      password.value.toUpperCase() !== password.value &&
      /\d/.test(password.value) &&
      /\W/.test(password.value),
  },
  {
    name: "The Password must be at least 8 characters long",
    predicate: password.value.length >= 8,
  },
  {
    name: "The password does not match",
    predicate: password.value == passwordRepeat.value,
  },
]);
const allRequirementsMet = computed(() => {
  return passwordRequirements.value.every(
    (requirement) => requirement.predicate
  );
});
// const emit = defineEmits([
//   'update:password',
//   'update:passwordRepeat',
//   'update:validity'
// ])
// watch(passwordRequirements, () => {
//   emit(
//     'update:validity',
//     passwordRequirements.value.reduce((v, p) => v && p.predicate, true)
//   )
// })
document.addEventListener("DOMContentLoaded", init);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");

body {
  background-color: #f5f6f8;
}

.container {
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  max-width: 95%;
  height: 96%;
  border-radius: 19px;
  /* margin: 0; */
}

.card {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
  border: none;
}

.form-group {
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  position: relative;
}

/* input,
select {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  outline: none;
  border: none;
  padding-left: 13px;
  width: 471px;
  height: 43px;
  border-radius: 8px;
  background-color: #F5F6F8;
  color: #000000;
  ;
} */
.input-change-pass {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  outline: none;
  border: none;
  padding-left: 13px;
  width: 100%;
  height: 43px;
  border-radius: 8px;
  background-color: #f5f6f8;
  color: #000000;
}

.input-user-info {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  outline: none;
  border: none;
  padding-left: 13px;
  width: 471px;
  height: 43px;
  border-radius: 8px;
  background-color: #f5f6f8;
  color: #000000;
}

label {
  font-family: "Poppins", sans-serif;
  display: block;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 0.5rem;
}

.btn {
  height: 38px;
  border-radius: 8px;
  border: none;
  margin: 10px 8px;
  cursor: pointer;
}

.btn-save {
  background-color: #0565f9;
  color: white;
  width: 60px;
}

.btn-save:disabled {
  cursor: not-allowed !important;
  cursor: not-allowed !important;
}

.btn-cancel {
  background-color: #e8e7e7;
}

.btn-edit-profile {
  font-family: "Poppins", sans-serif;
  border: 2px solid #0365fc;
  color: #0063fd;
  font-size: 14px;
  font-weight: 700;
  height: 45px;
  /* width: 143px; */
}

.btn-change-password {
  font-family: "Poppins", sans-serif;
  border: 2px solid #0366ff;
  font-size: 14px;
  font-weight: 700;
  height: 45px;
  /* width: 143px; */
}

.avartar-img {
  width: 122px;
  border-radius: 70px;
  margin-right: 26px;
}

h1 {
  font-family: "Poppins", sans-serif;
  margin: 30px 0 10px 0;
}

.requirements {
  font-weight: bold;
}

.is-success {
  color: #96ca2d;
}

.is-error {
  color: #ba3637;
}

.eye-icon {
  position: absolute;
  top: 71%;
  transform: translateY(-50%);
  cursor: pointer;
  left: 87%;
  top: 71%;
  transform: translateY(-50%);
  cursor: pointer;
  left: 87%;
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

<template>
  <div class="container">
    <div style="display: flex; padding-top: 20PX;
    padding-left: 5rem;align-items: center;">
      <img src="../components/icons/minh.jpg">
      <div>
        <h1>{{ fullNameRaw || 'null' }}</h1>
        <p style="margin: 0;">{{ emailRaw || 'null' }}</p>
      </div>
      <div style="display: flex;flex: 0%;justify-content: flex-end;">
        <button class="btn btn-edit-profile">Edit my profile</button>
        <button class="btn btn-change-password">Change password</button>
      </div>
    </div>
    <div class="card">
      <div>
        <form @submit.prevent="submitForm">
          <div style="display: flex;">
            <div class="form-group">
              <label for="fullName">Full Name</label>
              <input type="text" id="fullName" v-model="fullName" />
            </div>
            <div class="form-group">
              <label>Gender</label>
              <select name="gender" v-model="localUser.gender">
                <option value="true">Male</option>
                <option value="false">Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div style="display: flex;">
            <div class="form-group">
              <label>Date Of Birth</label>
              <input type="date" v-model="localUser.dateOfBirth" />
            </div>
            <div class="form-group">
              <label>Id Number</label>
              <input type="text" v-model="localUser.userId" disabled>
            </div>
          </div>
          <div class="form-group">
            <label>Place Of Permanent</label>
            <input type="text" v-model="localUser.placeOfPermanet" style="width: 98%;" />
          </div>
          <div style="display: flex;">
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" v-model="localUser.email" />
            </div>
            <div class="form-group">
              <label>Contact Number</label>
              <input type="text" v-model="localUser.contact" />
            </div>
          </div>
          <div style="display: flex;justify-content: center;">
            <button class="btn btn-cancel" type="button" @click="cancelEdit">Go to home</button>
            <button class="btn btn-save" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import type { User } from "@/type/User";
import userService from "@/services/userService";
import { useRoute, useRouter } from "vue-router";

const editedUser = ref<User | null>(null);
const localUser = ref<User>({
  userId: "",
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  placeOfPermanet: "",
  email: "",
  contact: "",
  password: "",
  roleId: 0
});
const route = useRoute();
const router = useRouter();
// let id = route.params.id;
let id = "000001";
var emailRaw = "";
var fullNameRaw = "";
userService.getUserById(id).then((response) => {
  editedUser.value = response;
  localUser.value = response;
  localUser.value = { ...response, dateOfBirth: formatDate(response.dateOfBirth) };  
  emailRaw = editedUser.value.email;
  fullNameRaw = `${localUser.value.firstName} ${localUser.value.lastName}`;
});
const fullName = computed({
  get: () => {
    return `${localUser.value.firstName} ${localUser.value.lastName}`;
  },
  set: (value: string) => {
    const names = value.split(' ');
    localUser.value.firstName = names[0];
    localUser.value.lastName = names.slice(1).join(' ');
  }
});
const formatDate = (dateString: string) => {
  // return dateString.split('T')[0];
  return new Date(dateString).toISOString().split('T')[0];
};
console.log("aaaa");
const submitForm = () => {
  console.log(localUser.value.dateOfBirth+" DateOfBirth----");
  userService.editProfile(localUser.value).then(() => {
    window.location.reload();
  });
};
const cancelEdit = () => {
  router.push({ name: "home" });
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');

body {
  background-color: #F5F6F8;
}

.container {
  background: white;
  margin-top: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}

.card {

  display: flex;
  justify-content: center;
  padding: 10px 20px;
}

.form-group {
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

input,
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
}

label {
  font-family: 'Poppins', sans-serif;
  display: block;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 0.5rem;
}

.btn {
  height: 30px;
  border-radius: 8px;
  border: none;
  margin: 10px 8px;
  cursor: pointer;
}

.btn-save {
  background-color: #0565F9;
  color: white;
  width: 60px;
}

.btn-cancel {
  background-color: #E8E7E7;

}

.btn-edit-profile {
  font-family: 'Poppins', sans-serif;
  border: 2px solid #0365FC;
  color: #0063FD;
  font-size: 14px;
  font-weight: 700;
  height: 45px;
  /* width: 143px; */
}
.btn-change-password{
  font-family: 'Poppins', sans-serif;
  border: 2px solid #0366FF;
  font-size: 14px;
  font-weight: 700;
  height: 45px;
  /* width: 143px; */
}
img {
  width: 122px;
  border-radius: 70px;
  margin-right: 26px;
}

h1 {
  font-family: 'Poppins', sans-serif;
  margin: 30px 0 10px 0;
}
</style>

<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div style="display: flex;height: 97%">
        <SideBar />
        <div style="
    background: #F5F6F8;
    width: 100%;
    height: 100%;
">
            <div class="container">
                <div class="card">

                    <div style="display: flex;">
                        <div class="line-blue"></div>
                        <div>
                            <h3>List of Apartment Tenants</h3>
                            <p style="    font-style: italic;">List of All Apartment Tenants citizen</p>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex;justify-content: center;">
                            <div style="border-radius: 17px;
    background-color: #e9e9e9;
    width: 350px;">
                                <img @click="getTenantPanigation()" src="../components/icons/searchIcon.png"
                                    style="width: 8%;height: 54%;cursor: pointer;    margin-left: 14px;">
                                <input type="text" v-model="searchValue" @change="getTenantPanigation()"
                                    class="input-search" placeholder="Please enter a full name" style="    width: 81%;">
                            </div>
                        </div>
                        <div v-if="tenants == ''" style="display: flex;justify-content: center">
                            <p style="margin: 0;margin-top: 10px;">No data to display</p>
                        </div>
                        <div v-else style="display: flex;justify-content: flex-end;">
                            <p style="margin-right: 31px; margin-bottom: 0;">Total: {{ totalElement }}</p>
                        </div>
                        <div style="box-shadow: rgba(0, 0, 0, 0.23) 0px 0px 4px;border-radius: 5px;">
                            <div style="margin: 12px;">
                                <table style="width: 100%;">
                                    <thead style="color: #9B9B9B;border-bottom: solid #B0B4CD 1px;height: 45px;">
                                        <th>No.</th>
                                        <th>Full Name</th>
                                        <th>Room No</th>
                                        <th>Gender</th>
                                        <th>D.O.B</th>
                                        <th>Mobile No</th>
                                        <th>Email ID</th>
                                        <th>Citizen ID</th>
                                        <th>Career</th>
                                        <th>License Plate</th>
                                        <th>Action</th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(tenant) in tenants" :key="tenant.email" style="height:50px;">
                                            <td>{{ tenant.id }}</td>
                                            <td>{{ tenant.firstName }} {{ tenant.lastName }}</td>
                                            <td>{{ tenant.roomId }}</td>
                                            <td>
                                                <div v-if="tenant.gender == 1">Male</div>
                                                <div v-if="tenant.gender == 2">Female</div>
                                                <div v-if="tenant.gender == 3">Other</div>
                                            </td>
                                            <td>{{ tenant.dateOfBirth }}</td>
                                            <td>{{ tenant.contact }}</td>
                                            <td>{{ tenant.email }}</td>
                                            <td>{{ tenant.citizenId }}</td>
                                            <td>{{ tenant.career }}</td>
                                            <td>{{ tenant.licensePlate }}</td>
                                            <td>
                                                <a @click="getTenantByRoom(tenant.roomId)" data-bs-toggle="modal"
                                                    data-bs-target="#tenantDetailModal"><i><img
                                                            src="../components/icons/eye.png"
                                                            style="width: 23px;"></i></a>
                                                <a @click="deleteTenant(tenant.email)" href="#"><i><img
                                                            src="../components/icons/TrashIcon.png"
                                                            style="width: 23px;"></i></a>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- <div v-else style="box-shadow: rgba(0, 0, 0, 0.23) 0px 0px 4px;border-radius: 5px;display: flex;

    justify-content: center;"><p>No data to display</p></div> -->
                    </div>
                    <nav v-if="tenants != ''" aria-label="Page navigation example">
                        <ul class="pagination justify-content-end">
                            <li class="page-item">
                                <a href="#" :class="currentPage == 0 ? 'disabled-a-tag' : ''"
                                    @click="getTenantPanigation(currentPage - 1)"><i class="fa fa-angle-left"
                                        style="font-size: x-large"></i></a>
                            </li>
                            <li class="page-item" v-for="index in totalPage">
                                <a href="#" :class="currentPage + 1 == index ? 'current-page' : 'non-current-page'
                                    " @click="getTenantPanigation(index - 1)">{{ index }}</a>
                            </li>
                            <li class="page-item">
                                <a href="#" :class="currentPage == totalPage - 1 ? 'disabled-a-tag' : ''"
                                    @click="getTenantPanigation(currentPage + 1)"><i class="fa fa-angle-right"
                                        style="font-size: x-large"></i></a>
                            </li>
                        </ul>
                    </nav>
                    <!-- Modal -->
                    <div class="modal fade" id="tenantDetailModal" tabindex="-1"
                        aria-labelledby="tenantDetailModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" style="max-width: 100%">
                            <div class="modal-content">
                                <!-- <div class="modal-header">
            <h5 class="modal-title" id="changePassModalLabel">Change Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div> -->
                                <form @submit.prevent="updateTenant">
                                    <div class="modal-body">
                                        <p><i><img src="../components/icons/eye.png" style="width: 23px;"></i> View
                                            Details
                                        </p>
                                        <table style="width: 100%;">
                                            <thead
                                                style="color: #9B9B9B;border-bottom: solid #B0B4CD 1px;height: 45px;">
                                                <th>No.</th>
                                                <th>Full Name</th>
                                                <th>Room No</th>
                                                <th>Gender</th>
                                                <th>D.O.B</th>
                                                <th>Mobile No</th>
                                                <th>Email ID</th>
                                                <th>Citizen ID</th>
                                                <th>Career</th>
                                                <th>License Plate</th>
                                                <th>Vehicle Type</th>
                                                <th>Vehicle Color</th>
                                                <th style="width: 7rem;">Temporary Residence Status</th>
                                                <th>Action</th>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(tenantDetail) in tenantDetail" style="height:50px;">
                                                    <td>{{ tenantDetail.id }}</td>
                                                    <td>{{ tenantDetail.firstName }} {{ tenantDetail.lastName }}</td>
                                                    <td v-if="isEditing">
                                                        <!-- <input v-model="tenantDetail.roomId" style="width: 38px;"
                                                        class="input-edit"> -->
                                                        <select v-model="tenantDetail.roomId" class="input-edit">
                                                            <option v-for="room in rooms" :value="room.roomId">{{
                                                                room.roomId }}</option>
                                                        </select>
                                                    </td>
                                                    <td v-else>{{ tenantDetail.roomId }}</td>
                                                    <td v-if="isEditing">
                                                        <select v-model="tenantDetail.gender" class="input-edit">
                                                            <option :value="1">Male</option>
                                                            <option :value="2">Female</option>
                                                            <option :value="3">Other</option>
                                                        </select>
                                                    </td>
                                                    <td v-else>
                                                        <div v-if="tenantDetail.gender == 1">Male</div>
                                                        <div v-if="tenantDetail.gender == 2">Female</div>
                                                        <div v-if="tenantDetail.gender == 3">Other</div>
                                                    </td>
                                                    <td v-if="isEditing">
                                                        <input type="date" v-model="tenantDetail.dateOfBirth"
                                                            class="input-edit" style="width: 117px;">
                                                    </td>
                                                    <td v-else>{{ formatDate(tenantDetail.dateOfBirth) }}</td>
                                                    <td v-if="isEditing">
                                                        <input v-model="tenantDetail.contact" class="input-edit"
                                                            style="width: 125px;" />
                                                    </td>
                                                    <td v-else>{{ tenantDetail.contact }}</td>
                                                    <td>{{ tenantDetail.email }}</td>
                                                    <td v-if="isEditing">
                                                        <input v-model="tenantDetail.citizenId" class="input-edit"
                                                            style="width: 136px;" />
                                                    </td>
                                                    <td v-else>{{ tenantDetail.citizenId }}</td>
                                                    <td v-if="isEditing">
                                                        <input v-model="tenantDetail.career" class="input-edit"
                                                            style="width: 125px;" />
                                                    </td>
                                                    <td v-else>{{ tenantDetail.career }}</td>
                                                    <td v-if="isEditing">
                                                        <input v-model="tenantDetail.licensePlate" class="input-edit"
                                                            style="width: 130px;" />
                                                    </td>
                                                    <td v-else>{{ tenantDetail.licensePlate }}</td>
                                                    <td v-if="isEditing">
                                                        <input v-model="tenantDetail.vehicleType" class="input-edit"
                                                            style="width: 117px;" />
                                                    </td>
                                                    <td v-else>{{ tenantDetail.vehicleType }}</td>
                                                    <td v-if="isEditing">
                                                        <input v-model="tenantDetail.vehicleColor" class="input-edit"
                                                            style="width: 117px;" />
                                                    </td>
                                                    <td v-else>{{ tenantDetail.vehicleColor }}</td>
                                                    <td v-if="isEditing">
                                                        <!-- <select v-model="tenantDetail.residenceStatus" class="input-edit"
                                                        style="width: 116px;">
                                                        <option value="Success">Success</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Failed">Failed</option>
                                                    </select> -->
                                                        <select v-if="tenantDetail.residenceStatus == 'Success'"
                                                            style="width: 116px;"
                                                            class="residence-status-success residence-status"
                                                            v-model="tenantDetail.residenceStatus">
                                                            <option value="Success" style="color: black;">Success
                                                            </option>
                                                            <option value="In Progress" style="color: black;">In
                                                                Progress
                                                            </option>
                                                            <option value="Failed" style="color: black;">Failed</option>
                                                        </select>
                                                        <select v-if="tenantDetail.residenceStatus == 'In Progress'"
                                                            style="width: 116px;"
                                                            class="residence-status-progress residence-status"
                                                            v-model="tenantDetail.residenceStatus">
                                                            <option value="Success" style="color: black;">Success
                                                            </option>
                                                            <option value="In Progress" style="color: black;">In
                                                                Progress
                                                            </option>
                                                            <option value="Failed" style="color: black;">Failed</option>
                                                        </select>
                                                        <select v-if="tenantDetail.residenceStatus == 'Failed'"
                                                            style="width: 116px;"
                                                            class="residence-status-fail residence-status"
                                                            v-model="tenantDetail.residenceStatus">
                                                            <option value="Success" style="color: black;">Success
                                                            </option>
                                                            <option value="In Progress" style="color: black;">In
                                                                Progress
                                                            </option>
                                                            <option value="Failed" style="color: black;">Failed</option>
                                                        </select>
                                                    </td>
                                                    <td v-else>
                                                        <div v-if="tenantDetail.residenceStatus == 'Success'"
                                                            class="residence-status-success residence-status">{{
                                                                tenantDetail.residenceStatus }}</div>
                                                        <div v-if="tenantDetail.residenceStatus == 'In Progress'"
                                                            class="residence-status-progress residence-status">{{
                                                                tenantDetail.residenceStatus }}</div>
                                                        <div v-if="tenantDetail.residenceStatus == 'Failed'"
                                                            class="residence-status-fail residence-status">{{
                                                                tenantDetail.residenceStatus }}</div>
                                                    </td>
                                                    <td>
                                                        <a href="#" @click="editTenant()"><i><img
                                                                    src="../components/icons/PencilIcon.png"
                                                                    style="width: 23px;"></i></a>
                                                        <a href="#" @click="deleteTenant(tenantDetail.email)"><i><img
                                                                    src="../components/icons/TrashIcon.png"
                                                                    style="width: 23px;"></i></a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" @click="isEditing = false" class="btn btn-cancel"
                                            data-bs-dismiss="modal"><a href="#"
                                                style="text-decoration: none;color: black;">Cancel</a></button>
                                        <button type="submit" @click="updateTenant" :disabled="!isEditing"
                                            class="btn btn-save"><a href="#"
                                                style="text-decoration: none;color: white;">Save</a></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SideBar from "@/components/SideBar.vue";
import { ref, nextTick } from "vue";
import type { Tenant } from "@/type/Tenant";
import tenantService from "@/services/tenantService";
import roomService from "@/services/roomService";
import Swal from "sweetalert2";
import type { Room } from "@/type/Room";

const tenants = ref<Tenant[]>([]);
const tenantDetail = ref<Tenant[]>([]);
var searchValue = "";
let isEditing = false;
var totalElement = 0;
var totalPage = 0;
var currentPage = 0;
const timeFomat = (dateString: string) => {
  return dateString + "T17:00:00.000+00:00";
};
const updateTenant = async () => {
    isEditing = false;
    for (const tenant of tenantDetail.value) {
        tenant.dateOfBirth = timeFomat(tenant.dateOfBirth);
    }
    tenantService.updateTenant(tenantDetail.value).then((response) => {
        console.log(response);
        Swal.fire({
            title: "Success!",
            text: "Updated successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(() => {
                window.location.reload();
            }, 1500);
    });
}
const getTenantPanigation = (pageNo: number) => {
  tenantService.getAllTenant(pageNo, searchValue).then((response) => {
    tenants.value = response.content.map(
      (tenants: {
        id: any;
        email: any;
        roomId: any;
        career: any;
        licensePlate: any;
        vehicleType: any;
        vehicleColor: any;
        residenceStatus: any;
        contractId: any;
        dateOfBirth: string;
        firstName: any;
        lastName: any;
        gender: any;
        userId: any;
        contact: any;
        citizenId: any;
      }) => ({
        id: tenants.id,
        email: tenants.email,
        roomId: tenants.roomId,
        career: tenants.career,
        licensePlate: tenants.licensePlate,
        vehicleType: tenants.vehicleType,
        vehicleColor: tenants.vehicleColor,
        residenceStatus: tenants.residenceStatus,
        contractId: tenants.contractId,
        dateOfBirth: formatDate(tenants.dateOfBirth),
        firstName: tenants.firstName,
        lastName: tenants.lastName,
        gender: tenants.gender,
        userId: tenants.userId,
        contact: tenants.contact,
        citizenId: tenants.citizenId,
      })
    );
    totalElement = response.totalElements;
    totalPage = response.totalPages;
    currentPage = response.pageable.pageNumber;
    console.log(response);
  });
};
getTenantPanigation();
const rooms = ref<Room[]>([]);
const editTenant = async () => {
  roomService.getAllRoomAvailable().then((response) => {
    rooms.value = response.map(
      (room: { roomId: any; roomStatus: any; maxTenant: any }) => ({
        roomId: room.roomId,
        roomStatus: room.roomStatus,
        maxTenant: room.maxTenant,
      })
    );
  });
  await nextTick(() => {
    isEditing = true;
  });
};

const deleteTenant = (email: string) => {
    Swal.fire({
        text: "Are you sure want to delete?",
        showCancelButton: true,
        confirmButtonColor: "#0565F9",
        confirmButtonText: "Delete",
        cancelButtonColor: "#E8E7E7",
        denyButtonColor:"#3333"
    }).then((result) => {
        if (result.isConfirmed) {
            tenantService.deleteTenant(email);
            Swal.fire({
                title: "Deleted!",
                icon: "success",
                showConfirmButton: false,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    });
};
const getTenantByRoom = async (roomId: number) => {
    try {
        const response = await tenantService.getTenantByRoomId(roomId);
        tenantDetail.value = response.content.map((tenants: { id: any; email: any; roomId: any; career: any; licensePlate: any; vehicleType: any; vehicleColor: any; residenceStatus: any; contractId: any; dateOfBirth: string; firstName: any; lastName: any; gender: any; userId: any; contact: any; citizenId: any; }) => ({
            id: tenants.id,
            email: tenants.email,
            roomId: tenants.roomId,
            career: tenants.career,
            licensePlate: tenants.licensePlate,
            vehicleType: tenants.vehicleType,
            vehicleColor: tenants.vehicleColor,
            residenceStatus: tenants.residenceStatus,
            contractId: tenants.contractId,
            dateOfBirth: formatDate(tenants.dateOfBirth),
            firstName: tenants.firstName,
            lastName: tenants.lastName,
            gender: tenants.gender,
            userId: tenants.userId,
            contact: tenants.contact,
            citizenId: tenants.citizenId,
        }));
        console.log(tenantDetail.value);

    } catch (error) {
        console.error('Error fetching tenant data:', error);
    }
};
const formatDate = (dateString: string) => {
  return dateString.split("T")[0];
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");

.container {
    background: white;
    margin-top: 20px;
    box-shadow: -2px -1px 9px 0px rgba(0, 0, 0, 0.25);
    font-family: 'Poppins', sans-serif;
    border-radius: 14px;
    max-width: 97%;
    height: 95%;
}
.sidebar {
  width: 18%;
}
.card {
    display: flex;
    justify-content: center;
    padding-top: 16px;
    /* margin-top: 3rem; */
    border: none;
}

.line-blue {
  width: 4px;
  background-color: #0064ff;
  height: 73px;
  margin-right: 12px;
}

.input-search {
  outline: none;
  border: none;
  border-radius: 17px;
  background-color: #e9e9e9;
  padding: 7px;
}

.btn {
    height: 30px;
    border-radius: 8px;
    border: none;
    margin: 10px 8px;
    cursor: pointer;
    padding-bottom: 30px;
}

.btn-save {
  background-color: #0565f9;
  color: white;
  width: 68px;
}

.btn-cancel {
  background-color: #e8e7e7;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

a {
  cursor: pointer;
}

.residence-status {
  border-radius: 6px;
  width: 94px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  justify-content: center;
}

.residence-status-success {
  color: #009d3f;
  border: solid 2px #00d656fe;
  height: 27px;
}

.residence-status-progress {
  color: #ffbd5a;
  border: solid 2px #ffd79b;
  height: 27px;
}

.residence-status-fail {
  color: #fb2424;
  border: solid 2px #ff7d7d;
  height: 27px;
}

.input-tenant-detail {
  border: none;
  border-radius: 5px;
}

.current-page {
  color: #000231;
}

.non-current-page {
  color: #9b9b9b;
  text-decoration: none;
}

.page-item {
  margin-right: 10px;
}

.disabled-a-tag {
  pointer-events: none;
  color: #9b9b9b;
}

.input-edit {
  color: #8d8c8c;
  border: none;
  outline: none;
}

.residence-status {
  border-radius: 6px;
  width: 94px;
  font-weight: 600;
  font-size: 14px;
}

.residence-status-success {
  border-color: #00d656fe;
  color: #009d3f;
}

.residence-status-progress {
  border-color: #ffd79b;
  color: #ffbd5a;
}

.residence-status-fail {
  border-color: #ff7d7d;
  color: #fb2424;
}
</style>

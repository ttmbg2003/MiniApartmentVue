<template>
    <div style="display: flex;">
        <SideBar />
        <div class="container">
            <div class="card">

                <div style="display: flex;">
                    <div class="line-blue"></div>
                    <div>
                        <h3>List of Apartment Tenants</h3>
                        <p>List of All Apartment Tenants</p>
                    </div>
                </div>
                <div>
                    <div style="display: flex;justify-content: center;    margin-bottom: 23px;">
                        <img src="../components/icons/searchIcon.png" style="width: 2%;height: 2%;margin-top: 8px;">
                        <input type="text" v-model="searchValue" class="input-search"
                            placeholder="Please enter a full name">
                    </div>
                    <div style="display: flex;justify-content: flex-end;">
                        <p style="margin-right: 31px;margin-bottom: 12px;">Total: {{ clientItemsLength }}</p>
                    </div>
                    <EasyDataTable ref="dataTable" buttons-pagination :headers="headers" :items="tenant"
                        :search-value="searchValue" show-index :must-sort="true" :rows-per-page="10"
                        table-class-name="customize-table">
                        <template #item-action="item">
                            <a @click="getTenantByRoom(item.roomId)" data-bs-toggle="modal"
                                data-bs-target="#tenantDetailModal"><i><img src="../components/icons/eye.png"
                                        style="width: 23px;"></i></a>
                            <a href="#" @click="() => deleteTenant(item.email)"><i><img
                                        src="../components/icons/TrashIcon.png" style="width: 23px;"></i></a>
                        </template>
                    </EasyDataTable>
                </div>
                <!-- Modal -->
                <div class="modal fade" id="tenantDetailModal" tabindex="-1" aria-labelledby="tenantDetailModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" style="max-width: 100%;">
                        <div class="modal-content">
                            <!-- <div class="modal-header">
            <h5 class="modal-title" id="changePassModalLabel">Change Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div> -->
                            <form>
                                <div class="modal-body">
                                    <p><i><img src="../components/icons/eye.png" style="width: 23px;"></i> View Details
                                    </p>
                                    <EasyDataTable :headers="headersTenantDetail" :items="tenantDetail" hide-footer
                                        show-index table-class-name="customize-table">
                                        <template #item-action="item">
                                            <a @click="allowEdit"><i><img src="../components/icons/PencilIcon.png"
                                                        style="width: 23px;"></i></a>
                                            <a href="#" @click="() => deleteTenant(item.email)"><i><img
                                                        src="../components/icons/TrashIcon.png"
                                                        style="width: 23px;"></i></a>
                                        </template>
                                        <template #item-roomId="item" v-if="isEdit == true">
                                            <input class="input-tenant-detail" v-model="item.roomId"
                                                style="width: 35px;">
                                        </template>
                                        <template #item-gender="item"  v-if="isEdit == true">
                                            <!-- <input class="input-tenant-detail" v-model="item.gender"> -->
                                            {{ item.gender }}
                                        </template>
                                        <template #item-dateOfBirth="item"  v-if="isEdit == true">
                                            <input class="input-tenant-detail" v-model="item.dateOfBirth" type="date">
                                        </template>
                                        <template #item-contact="item"  v-if="isEdit == true">
                                            <input class="input-tenant-detail" v-model="item.contact">
                                        </template>
                                        <template #item-citizenId="item"  v-if="isEdit == true">
                                            <input class="input-tenant-detail" v-model="item.citizenId">
                                        </template>
                                        <template #item-career="item"  v-if="isEdit == true">
                                            <input class="input-tenant-detail" v-model="item.career"
                                                style="width: 60px;">
                                        </template>
                                        <template #item-licensePlate="item"  v-if="isEdit == true">
                                            <input class="input-tenant-detail" v-model="item.licensePlate"
                                                style="width: 90px;">
                                        </template>
                                        <template #item-vehicleType="item"  v-if="isEdit == true">
                                            <input class="input-tenant-detail" v-model="item.vehicleType"
                                                style="width: 60px;">
                                        </template>
                                        <template #item-vehicleColor="item"  v-if="isEdit == true">
                                            <input class="input-tenant-detail" v-model="item.vehicleColor"
                                                style="width: 60px;">
                                        </template>
                                        <template #item-residenceStatus="item"  v-if="isEdit == true">
                                            <select class="residence-status" v-model="item.residenceStatus">
                                                <option class="btn-residence-status-success" value="Success">Success
                                                </option>
                                                <option class="btn-residence-status-progress" value="In Progress">In
                                                    Progress</option>
                                                <option class="btn-residence-status-fail" value="Failed">Failed</option>
                                            </select>
                                            <!-- <div class="residence-status" v-if="item.residenceStatus === 'Success'">
                                                <button class="btn-residence-status-success btn-residence-status"
                                                    disabled>Success</button>
                                            </div>
                                            <div class="residence-status" v-if="item.residenceStatus === 'In Progress'">
                                                <button disabled
                                                    class="btn-residence-status-progress btn-residence-status">Progress</button>
                                            </div>
                                            <div class="residence-status" v-if="item.residenceStatus === 'Failed'">
                                                <button disabled
                                                    class="btn-residence-status-fail btn-residence-status">Failed</button>
                                            </div> -->
                                        </template>
                                    </EasyDataTable>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-cancel" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn btn-save">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SideBar from "@/components/SideBar.vue";
import { computed, ref } from "vue";
import type { Tenant } from '@/type/Tenant'
import tenantService from '@/services/tenantService';
import type { Header, Item } from "vue3-easy-data-table";
import Swal from 'sweetalert2'
// import type { UsePaginationReturn, UseRowsPerPageReturn } from "use-vue3-easy-data-table";
// import { usePagination, useRowsPerPage } from "use-vue3-easy-data-table";

const tenant = ref<Tenant[]>([]);
const tenantDetail = ref<Tenant[]>([]);
const searchValue = ref("");
const dataTable = ref();
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);
let isEdit = false;
const allowEdit = () =>{
    $('#tenantDetailModal').modal('hide');
}
const deleteTenant = (email: string) => {
    console.log(isEdit);
    Swal.fire({
        text: "Are you sure want to delete?",
        showCancelButton: true,
        confirmButtonColor: "#0565F9",
        confirmButtonText: "Delete",
        cancelButtonColor: "#E8E7E7",
    }).then((result) => {
        if (result.isConfirmed) {
            tenantService.deleteTenant(email)
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

}
const getTenantByRoom = (roomId: number) => {
    tenantService.getTenantByRoomId(roomId).then((response) => {
        tenantDetail.value = response.map(tenantDetail => ({
            email: tenantDetail.email,
            roomId: tenantDetail.roomId,
            career: tenantDetail.career,
            licensePlate: tenantDetail.licensePlate,
            vehicleType: tenantDetail.vehicleType,
            vehicleColor: tenantDetail.vehicleColor,
            residenceStatus: tenantDetail.residenceStatus,
            contractId: tenantDetail.contractId,
            dateOfBirth: tenantDetail.dateOfBirth,
            firstName: tenantDetail.firstName,
            lastName: tenantDetail.lastName,
            gender: tenantDetail.gender,
            userId: tenantDetail.userId,
            contact: tenantDetail.contact,
            citizenId: tenantDetail.citizenId,
            fullName: `${tenantDetail.firstName} ${tenantDetail.lastName}`,
        }))
    })
}
tenantService.getAllTenant().then((response) => {
    tenant.value = response.map(tenant => ({
        email: tenant.email,
        roomId: tenant.roomId,
        career: tenant.career,
        licensePlate: tenant.licensePlate,
        vehicleType: tenant.vehicleType,
        vehicleColor: tenant.vehicleColor,
        residenceStatus: tenant.residenceStatus,
        contractId: tenant.contractId,
        dateOfBirth: tenant.dateOfBirth,
        firstName: tenant.firstName,
        lastName: tenant.lastName,
        gender: tenant.gender,
        userId: tenant.userId,
        contact: tenant.contact,
        citizenId: tenant.citizenId,
        fullName: `${tenant.firstName} ${tenant.lastName}`,
    }));
});

const headers: Header[] = [
    { text: "Full Name", value: "fullName", sortable: true },
    { text: "Room No", value: "roomId", sortable: true },
    { text: "Gender", value: "gender", sortable: true },
    { text: "D.O.B", value: "dateOfBirth", sortable: true },
    { text: "Mobile No", value: "contact", sortable: true },
    { text: "Email ID", value: "email", sortable: true },
    { text: "Citizen ID", value: "citizenId", sortable: true },
    { text: "Career", value: "career", sortable: true },
    { text: "License plate", value: "licensePlate", sortable: true },
    { text: "Action", value: "action" },
];
const headersTenantDetail: Header[] = [
    { text: "Full Name", value: "fullName", width: 150 },
    { text: "Room No", value: "roomId" },
    { text: "Gender", value: "gender" },
    { text: "D.O.B", value: "dateOfBirth" },
    { text: "Mobile No", value: "contact" },
    { text: "Email ID", value: "email" },
    { text: "Citizen ID", value: "citizenId" },
    { text: "Career", value: "career" },
    { text: "License plate", value: "licensePlate" },
    { text: "Vehicle Type", value: "vehicleType" },
    { text: "Vehicle Color", value: "vehicleColor" },
    { text: "Residence Status", value: "residenceStatus" },
    { text: "Action", value: "action" },
];
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');

.container {
    background: white;
    margin-top: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    font-family: 'Poppins', sans-serif;
    margin-right: 1rem;
    border-radius: 14px;
}

.card {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    border: none;
}

.line-blue {
    width: 4px;
    background-color: #0064FF;
    height: 73px;
    margin-right: 2px;
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
}

.btn-save {
    background-color: #0565F9;
    color: white;
    width: 68px;
}

.btn-cancel {
    background-color: #E8E7E7;

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

.customize-table {
    --easy-table-border: 0;
    --easy-table-header-font-size: 15px;
    --easy-table-header-height: 47px;
    --easy-table-body-row-height: 43px;
    --easy-table-header-font-color: #9B9B9B;
    --easy-table-footer-height: 49px;
}

.input-tenant-detail {
    border: none;
    border-radius: 5px
}
</style>
<template>
  <div style="display: flex">
    <SideBar />
    <div class="container">
      <div class="card">
        <div style="display: flex">
          <div class="line-blue"></div>
          <div>
            <h3>List of Apartment Tenants</h3>
            <p>List of All Apartment Tenants</p>
          </div>
        </div>
        <div>
          <VueDatePicker
            v-model="year"
            year-picker
            disable-year-select
            :year-range="[2020, 2040]"
            placeholder="Select year"
            style="width: 153px"
          />
          <VueDatePicker v-model="month" month-picker />
          <div style="display: flex; justify-content: flex-end">
            <p style="margin-right: 31px; margin-bottom: 12px">
              Total: {{ clientItemsLength }}
            </p>
          </div>
          <EasyDataTable
            ref="dataTable"
            buttons-pagination
            :headers="headersMain"
            :items="payment"
            show-index
            :must-sort="true"
            :rows-per-page="10"
            table-class-name="customize-table"
          >
            <template #item-action="item">
              <a data-bs-toggle="modal" data-bs-target="#tenantDetailModal"
                ><i
                  ><img
                    src="../components/icons/eye.png"
                    style="width: 23px" /></i
              ></a>
              <a href="#" @click="() => deleteTenant(item.email)"
                ><i
                  ><img
                    src="../components/icons/TrashIcon.png"
                    style="width: 23px" /></i
              ></a>
            </template>
          </EasyDataTable>
        </div>
        <!-- Modal -->
        <div
          class="modal fade"
          id="tenantDetailModal"
          tabindex="-1"
          aria-labelledby="tenantDetailModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered"
            style="max-width: 100%"
          >
            <div class="modal-content">
              <!-- <div class="modal-header">
            <h5 class="modal-title" id="changePassModalLabel">Change Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div> -->
              <div class="modal-body">
                <p>
                  <i
                    ><img src="../components/icons/eye.png" style="width: 23px"
                  /></i>
                  View Details
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-cancel"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" class="btn btn-save">Save</button>
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
import { computed, ref, reactive } from "vue";
import type { IListPayment } from "@/type/IListPayment";
import paymentService from "@/services/paymentService";
import type { Header, Item } from "vue3-easy-data-table";
import Swal from "sweetalert2";
// import type { UsePaginationReturn, UseRowsPerPageReturn } from "use-vue3-easy-data-table";
// import { usePagination, useRowsPerPage } from "use-vue3-easy-data-table";

const payment = ref<IListPayment[]>([]);
const searchValue = ref("");
const dataTable = ref();
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);

const deleteTenant = (email: string) => {
  Swal.fire({
    text: "Are you sure want to delete?",
    showCancelButton: true,
    confirmButtonColor: "#0565F9",
    confirmButtonText: "Delete",
    cancelButtonColor: "#E8E7E7",
  }).then((result) => {
    if (result.isConfirmed) {
      paymentService.getTenantByRoomId(email);
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
// const getTenantByRoom = (roomId: number) => {
//     tenantService.getTenantByRoomId(roomId).then((response) => {
//         tenantDetail.values = response.map(tenantDetail => ({
//             email: tenantDetail.email,
//             roomId: tenantDetail.roomId,
//             career: tenantDetail.career,
//             licensePlate: tenantDetail.licensePlate,
//             vehicleType: tenantDetail.vehicleType,
//             vehicleColor: tenantDetail.vehicleColor,
//             residenceStatus: tenantDetail.residenceStatus,
//             contractId: tenantDetail.contractId,
//             dateOfBirth: tenantDetail.dateOfBirth,
//             firstName: tenantDetail.firstName,
//             lastName: tenantDetail.lastName,
//             gender: tenantDetail.gender,
//             userId: tenantDetail.userId,
//             contact: tenantDetail.contact,
//             citizenId: tenantDetail.citizenId,
//             fullName: `${tenantDetail.firstName} ${tenantDetail.lastName}`,
//         }))
//     })
// }
// const getTenantByRoom = async (roomId: number) => {
//             try {
//                 const response = await tenantService.getTenantByRoomId(roomId);
//                 if (Array.isArray(response)) {
//                     tenantDetail.splice(0, tenantDetail.length, ...response.map(({ email, roomId, career, licensePlate, vehicleType, vehicleColor, residenceStatus, contractId, dateOfBirth, firstName, lastName, gender, userId, contact, citizenId }) => ({
//                         email,
//                         roomId,
//                         career,
//                         licensePlate,
//                         vehicleType,
//                         vehicleColor,
//                         residenceStatus,
//                         contractId,
//                         dateOfBirth,
//                         firstName,
//                         lastName,
//                         gender,
//                         userId,
//                         contact,
//                         citizenId,
//                         fullName: `${firstName} ${lastName}`,
//                     })));
//                 } else {
//                     console.error('Response is not an array:', response);
//                 }
//             } catch (error) {
//                 console.error('Error fetching tenant data:', error);
//             }
//         };
// let year = 2024;
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth());
console.log(year);

paymentService.getListPaymentByYear(year.value).then((response) => {
  payment.value = response.map((payment) => ({
    roomId: payment.roomId,
    dec: payment.dec,
    apr: payment.apr,
    aug: payment.aug,
    feb: payment.feb,
    jan: payment.jan,
    jul: payment.jul,
    jun: payment.jun,
    mar: payment.mar,
    may: payment.may,
    nov: payment.nov,
    oct: payment.oct,
    sep: payment.sep,
    status: payment.status,
  }));
});

const headersMain: Header[] = [
  { text: "Room No", value: "roomId", sortable: true },
  { text: "Jan", value: "jan", sortable: true },
  { text: "Feb", value: "feb", sortable: true },
  { text: "Mar", value: "mar", sortable: true },
  { text: "Apr", value: "apr", sortable: true },
  { text: "May", value: "may", sortable: true },
  { text: "Jun", value: "jun", sortable: true },
  { text: "Jul", value: "jul", sortable: true },
  { text: "Aug", value: "aug", sortable: true },
  { text: "Sep", value: "sep" },
  { text: "Oct", value: "oct" },
  { text: "Nov", value: "nov" },
  { text: "Dec", value: "dec" },
  { text: "Status", value: "status" },
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
@import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");

.container {
  background: white;
  margin-top: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  font-family: "Poppins", sans-serif;
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
  background-color: #0064ff;
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
  --easy-table-header-font-color: #9b9b9b;
  --easy-table-footer-height: 49px;
}

.input-tenant-detail {
  border: none;
  border-radius: 5px;
}
</style>

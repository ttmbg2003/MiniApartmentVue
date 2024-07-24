<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div style="display: flex; height: 89%; margin-top: 90px">
    <SideBar />
    <div class="container">
      <div class="card">
        <div style="display: flex">
          <div class="line-blue"></div>
          <div>
            <h3>List of Lease Contracts</h3>
          </div>
          <router-link
            to="/newContract"
            class="btn btn-primary"
            style="
              height: 30px;
              border-radius: 8px;
              border: none;
              cursor: pointer;
              margin-left: 35rem;
              margin-top: 5px;
            "
            >Add new</router-link
          >
        </div>
        <div>
          <div style="display: flex; justify-content: center">
            <img
              @click="getContractPanigation()"
              src="../components/icons/searchIcon.png"
              style="width: 2%; height: 2%; margin-top: 8px; cursor: pointer"
            />
            <input
              type="text"
              v-model="searchValue"
              @change="getContractPanigation()"
              class="input-search"
              placeholder="Please enter a full name"
            />
          </div>
          <div
            v-if="contracts == ''"
            style="display: flex; justify-content: center"
          >
            <p style="margin: 0; margin-top: 10px">No data to display</p>
          </div>
          <div v-else style="display: flex; justify-content: flex-end">
            <p style="margin-right: 31px; margin-bottom: 0">
              Total: {{ totalElement }}
            </p>
          </div>
          <div
            style="
              box-shadow: rgba(0, 0, 0, 0.23) 0px 0px 4px;
              border-radius: 5px;
            "
          >
            <div style="margin: 12px">
              <table style="width: 100%">
                <thead
                  style="
                    color: #9b9b9b;
                    border-bottom: solid #b0b4cd 1px;
                    height: 45px;
                  "
                >
                  <th>No.</th>
                  <th>Room No</th>
                  <th>Representative</th>
                  <th>Number of Tenants</th>
                  <th>Rental Fee (VND)</th>
                  <th>Security Deposit (VND)</th>
                  <th>Payment Cycle</th>
                  <th>Contract</th>
                  <th>Contract Status</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  <tr
                    v-for="contract in contracts"
                    :key="contract.contractId"
                    style="height: 50px"
                  >
                    <td>{{ contract.contractId }}</td>
                    <td>{{ contract.roomId }}</td>
                    <td>{{ contract.representative }}</td>
                    <td>{{ contract.numberOfTenant }}</td>
                    <td>{{ contract.rentalFee }}</td>
                    <td>{{ contract.securityDeposite }}</td>
                    <td>{{ contract.paymentCycle }}</td>
                    <td>{{ contract.contract }}</td>
                    <td>{{ contract.contractStatus }}</td>
                    <td>
                      <a
                        @click="getContractByRoom(contract.roomId)"
                        data-bs-toggle="modal"
                        data-bs-target="#contractDetailModal"
                        ><i
                          ><img
                            src="../components/icons/eye.png"
                            style="width: 23px" /></i
                      ></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <nav v-if="contracts != ''" aria-label="Page navigation example">
          <ul class="pagination justify-content-end">
            <li class="page-item">
              <a
                href="#"
                :class="currentPage == 0 ? 'disabled-a-tag' : ''"
                @click="getContractPanigation(currentPage - 1)"
                ><i class="fa fa-angle-left" style="font-size: x-large"></i
              ></a>
            </li>
            <li class="page-item" v-for="index in totalPage">
              <a
                href="#"
                :class="
                  currentPage + 1 == index ? 'current-page' : 'non-current-page'
                "
                @click="getContractPanigation(index - 1)"
                >{{ index }}</a
              >
            </li>
            <li class="page-item">
              <a
                href="#"
                :class="currentPage == totalPage - 1 ? 'disabled-a-tag' : ''"
                @click="getContractPanigation(currentPage + 1)"
                ><i class="fa fa-angle-right" style="font-size: x-large"></i
              ></a>
            </li>
          </ul>
        </nav>
        <!-- Modal -->
        <div
          class="modal fade"
          id="contractDetailModal"
          tabindex="-1"
          aria-labelledby="contractDetailModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered"
            style="max-width: 100%"
          >
            <div class="modal-content">
              <form @submit.prevent="updateContract">
                <div class="modal-body">
                  <p>
                    <i
                      ><img
                        src="../components/icons/eye.png"
                        style="width: 23px"
                    /></i>
                    View Details
                  </p>
                  <table style="width: 100%">
                    <thead
                      style="
                        color: #9b9b9b;
                        border-bottom: solid #b0b4cd 1px;
                        height: 45px;
                      "
                    >
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
                      <th style="width: 7rem">Temporary Residence Status</th>
                      <th>Action</th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="contractDetail in contractDetail"
                        style="height: 50px"
                      >
                        <td>{{ contractDetail.id }}</td>
                        <td>
                          {{ contractDetail.firstName }}
                          {{ contractDetail.lastName }}
                        </td>
                        <td>{{ contractDetail.roomId }}</td>
                        <td>
                          <div v-if="contractDetail.gender">Male</div>
                          <div v-else>Female</div>
                        </td>
                        <td>{{ contractDetail.dateOfBirth }}</td>
                        <td>{{ contractDetail.contact }}</td>
                        <td>{{ contractDetail.email }}</td>
                        <td>{{ contractDetail.citizenId }}</td>
                        <td>{{ contractDetail.career }}</td>
                        <td>{{ contractDetail.licensePlate }}</td>
                        <td>{{ contractDetail.vehicleType }}</td>
                        <td>{{ contractDetail.vehicleColor }}</td>
                        <td>{{ contractDetail.residenceStatus }}</td>
                        <td>
                          <a @click="isEdit = true"
                            ><i
                              ><img
                                src="../components/icons/PencilIcon.png"
                                style="width: 23px" /></i
                          ></a>
                          <a href="#"
                            ><i
                              ><img
                                src="../components/icons/TrashIcon.png"
                                style="width: 23px" /></i
                          ></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
import { ref } from "vue";
import type { Contract } from "@/type/Contract";
import contractService from "@/services/contractService";
import Swal from "sweetalert2";

const contracts = ref<Contract[]>([]);
const contractDetail = ref<Contract[]>([]);
var searchValue = "";
let isEdit = false;
var totalElement = 0;
var totalPage = 0;
var currentPage = 0;

const getContractPanigation = (pageNo: number) => {
  contractService.getAllContract(pageNo, searchValue).then((response) => {
    contracts.value = response.content.map(
      (contracts: {
        contractId: any;
        roomId: any;
        numberOfTenant: any;
        rentalFee: any;
        securityDeposite: any;
        paymentCycle: any;
        contract: any;
        signinDate: any;
        moveinDate: any;
        expireDate: any;
        contractStatus: any;
        representative: any;
      }) => {
        return {
          contractId: contracts.contractId,
          roomId: contracts.roomId,
          numberOfTenant: contracts.numberOfTenant,
          rentalFee: contracts.rentalFee,
          securityDeposite: contracts.securityDeposite,
          paymentCycle: contracts.paymentCycle,
          contract: contracts.contract,
          signinDate: contracts.signinDate,
          moveinDate: contracts.moveinDate,
          expireDate: contracts.expireDate,
          contractStatus: contracts.contractStatus,
          representative: contracts.representative,
        };
      }
    );
    totalElement = response.totalElements;
    totalPage = response.totalPages;
    currentPage = pageNo;
  });
};

const getContractByRoom = (roomId: number) => {
  contractService.getContractByRoom(roomId).then((response) => {
    contractDetail.value = [response];
  });
};

const updateContract = () => {
  contractService.updateContract(contractDetail.value[0]).then(() => {
    Swal.fire({
      icon: "success",
      title: "Updated",
      text: "Contract information has been updated",
    });
    isEdit = false;
    getContractPanigation(currentPage);
  });
};

const deleteContract = (email: string) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      contractService.deleteContract(email).then(() => {
        Swal.fire("Deleted!", "Contract has been deleted.", "success");
        getContractPanigation(currentPage);
      });
    }
  });
};

getContractPanigation(0);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");

.container {
  background: white;
  margin-top: 20px;
  box-shadow: -2px -1px 9px 0px rgba(0, 0, 0, 0.25);
  font-family: "Poppins", sans-serif;
  border-radius: 14px;
  max-width: 83%;
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
</style>

<template>
  <div style="display: flex; height: 89%">
    <SideBar />
    <div class="container">
      <div class="card">
        <div style="display: flex">
          <div class="line-blue"></div>
          <div>
            <h3>List of Apartment Contracts</h3>
            <p style="font-style: italic">List of All Apartment Contracts</p>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: center">
            <img
              @click="getAllContract()"
              src="../components/icons/searchIcon.png"
              style="width: 2%; height: 2%; margin-top: 8px; cursor: pointer"
            />
            <input
              type="text"
              v-model="searchValue"
              @change="getAllContract()"
              class="input-search"
              placeholder="Please enter a representative name"
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
                    <td>{{ contract.expireDate }}</td>
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
                      <a @click="deleteContract(contract.contractId)" href="#"
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
          </div>
        </div>
        <nav v-if="contracts != ''" aria-label="Page navigation example">
          <ul class="pagination justify-content-end">
            <li class="page-item">
              <a
                href="#"
                :class="currentPage == 0 ? 'disabled-a-tag' : ''"
                @click="getAllContract(currentPage - 1)"
                ><i class="fa fa-angle-left" style="font-size: x-large"></i
              ></a>
            </li>
            <li class="page-item" v-for="index in totalPage">
              <a
                href="#"
                :class="
                  currentPage + 1 == index ? 'current-page' : 'non-current-page'
                "
                @click="getAllContract(index - 1)"
                >{{ index }}</a
              >
            </li>
            <li class="page-item">
              <a
                href="#"
                :class="currentPage == totalPage - 1 ? 'disabled-a-tag' : ''"
                @click="getAllContract(currentPage + 1)"
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
                      <th>Room No</th>
                      <th>Number of Tenants</th>
                      <th>Rental Fee</th>
                      <th>Security Deposit</th>
                      <th>Payment Cycle</th>
                      <th>Contract</th>
                      <th>Sign-in Date</th>
                      <th>Move-in Date</th>
                      <th>Expire Date</th>
                      <th>Contract Status</th>
                      <th>Representative</th>
                      <th>Action</th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="contractDetail in contractDetail"
                        style="height: 50px"
                      >
                        <td>{{ contractDetail.contractId }}</td>
                        <td>{{ contractDetail.roomId }}</td>
                        <td>{{ contractDetail.numberOfTenant }}</td>
                        <td>{{ contractDetail.rentalFee }}</td>
                        <td>{{ contractDetail.securityDeposite }}</td>
                        <td>{{ contractDetail.paymentCycle }}</td>
                        <td>{{ contractDetail.contract }}</td>
                        <td>{{ contractDetail.signinDate }}</td>
                        <td>{{ contractDetail.moveinDate }}</td>
                        <td>{{ contractDetail.expireDate }}</td>
                        <td>{{ contractDetail.contractStatus }}</td>
                        <td>{{ contractDetail.representative }}</td>
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

// const getAllContract = (pageNo: number) => {
//   contractService.getAllContract(pageNo, searchValue).then((response) => {
//     contracts.value = response.content.map((contract: Contract) => ({
//       contractId: contract.contractId,
//       roomId: contract.roomId,
//       numberOfTenant: contract.numberOfTenant,
//       rentalFee: contract.rentalFee,
//       securityDeposite: contract.securityDeposite,
//       paymentCycle: contract.paymentCycle,
//       contract: contract.contract,
//       signinDate: formatDate(contract.signinDate),
//       moveinDate: formatDate(contract.moveinDate),
//       expireDate: formatDate(contract.expireDate),
//       contractStatus: contract.contractStatus,
//       representative: contract.representative,
//     }));
//     totalElement = response.totalElements;
//     totalPage = response.totalPages;
//     currentPage = response.pageable.pageNumber;
//   });
//   console.log(contracts);
// };
// getAllContract();
const getAllContract = () => {
  contractService.getAllContract().then((response) => {
    contracts.value = response.content.map((contract: Contract) => ({
      contractId: contract.contractId,
      roomId: contract.roomId,
      numberOfTenant: contract.numberOfTenant,
      rentalFee: contract.rentalFee,
      securityDeposite: contract.securityDeposite,
      paymentCycle: contract.paymentCycle,
      contract: contract.contract,
      contractStatus: contract.contractStatus,
      representative: contract.representative,
    }));
  });
  console.log(contracts);
};
getAllContract();
const updateContract = async () => {
  try {
    console.log("Sending contract data:", contractDetail);
    await contractService.updateContract(contractDetail);
    console.log("Contract data updated successfully");
  } catch (error) {
    console.log(error);
  }
};

const deleteContract = (contractId: number) => {
  Swal.fire({
    title: "Are you sure to delete this contract?",
    showDenyButton: true,
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      contractService.deleteContract(contractId).then(() => {
        contracts.value = contracts.value.filter(
          (contract) => contract.contractId !== contractId
        );
        Swal.fire("Delete Successfully!", "", "success");
      });
    } else if (result.isDenied) {
      Swal.fire("Cancel Delete", "", "info");
    }
  });
};
const getContractByRoom = (roomId: number) => {
  contractService.getContractByRoom(roomId).then((response) => {
    contractDetail.value = response.map((contract: Contract) => ({
      contractId: contract.contractId,
      roomId: contract.roomId,
      numberOfTenant: contract.numberOfTenant,
      rentalFee: contract.rentalFee,
      securityDeposite: contract.securityDeposite,
      paymentCycle: contract.paymentCycle,
      contract: contract.contract,
      signinDate: formatDate(contract.signinDate),
      moveinDate: formatDate(contract.moveinDate),
      expireDate: formatDate(contract.expireDate),
      contractStatus: contract.contractStatus,
      representative: contract.representative,
    }));
  });
};
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};
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

<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div
    style="
      display: flex;
      width: 100%;
      background: rgb(245, 246, 248);
      min-height: 91vh;
    "
  >
    <SideBar class="sidebar" />
    <div class="container">
      <div class="card">
        <div style="display: flex">
          <div class="line-blue"></div>
          <div style="font-weight: bold; font-size: 1.8rem; width: 28rem">
            List of Lease Contracts
          </div>

          <div class="d-flex justify-content-end" style="width: 64rem">
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addNewExpensesModal"
            >
              <i style="margin-right: 10px">
                <img
                  src="../components/icons/circled-plus.png"
                  style="margin-bottom: 3px; width: 24px"
                />
              </i>
              Add new
            </button>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: center">
            <div
              style="
                border-radius: 17px;
                background-color: #e9e9e9;
                width: 350px;
              "
            >
              <img
                src="../components/icons/searchIcon.png"
                style="
                  width: 8%;
                  height: 54%;
                  cursor: pointer;
                  margin-left: 14px;
                "
              />
              <input
                type="text"
                v-model="searchQuery"
                class="input-search"
                placeholder="Please enter Room No or full name"
                style="width: 81%"
              />
            </div>
          </div>
          <div style="display: flex">
            <img
              style="
                width: 24px;
                height: 24px;
                top: 200px;
                left: 249px;
                padding: 6px 0px 3px 3px;
                gap: 0px;
                opacity: 0px;
              "
              src="../components/icons/Vector.png"
            />
            <i
              style="
                width: 4rem;
                height: 15px;
                top: 6px;
                left: 24px;
                gap: 0px;
                opacity: 0px;
              "
            >
              Filter
            </i>
            <div class="mt-4 checkbox">
              <el-checkbox
                style="
                  background: rgba(224, 222, 222, 0.4);
                  margin-left: 7rem;
                  --el-border-radius-base: 11px;
                "
                v-model="inLeaseTerm"
                label="In lease Term"
                border
              />
              <el-checkbox
                style="
                  background: rgba(224, 222, 222, 0.4);
                  --el-border-radius-base: 11px;
                "
                v-model="approachingExpiration"
                label="Approaching expiration"
                border
              />
              <el-checkbox
                style="
                  background: rgba(224, 222, 222, 0.4);
                  --el-border-radius-base: 11px;
                "
                v-model="pastExpiration"
                label="Past expiration"
                border
              />
            </div>
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
                  <th style="width: 2rem">No.</th>
                  <th style="width: 6rem">Room No</th>
                  <th style="width: 10rem">Representative</th>
                  <th style="width: 7rem">Number of Tenants</th>
                  <th style="width: 7rem">Rental Fee <span>(VND)</span></th>
                  <th style="width: 10rem">Security Deposit (VND)</th>
                  <th style="width: 9rem">Payment Cycle</th>
                  <th>Contract</th>
                  <th style="width: 9rem">Contract Status</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  <tr
                    v-for="contract in filteredContracts"
                    :key="contract.contractId"
                    style="height: 50px"
                  >
                    <td>{{ contract.id }}</td>
                    <td>{{ contract.roomId }}</td>
                    <td>{{ contract.representative }}</td>
                    <td>{{ contract.numberOfTenant }}</td>
                    <td>{{ formatNumber(contract.rentalFee) }}</td>
                    <td>{{ formatNumber(contract.securityDeposite) }}</td>
                    <td>{{ contract.paymentCycle }}</td>
                    <div style="margin-top: 0.8rem">
                      <td
                        style="
                          display: flex;
                          border: 0.1px solid rgb(208, 212, 223);
                          border-radius: 10px;
                          margin-right: 1.5rem;
                        "
                      >
                        <div style="display: flex; width: 10rem">
                          {{
                            contract.contract?.split("/").pop() ??
                            "Unknown_File"
                          }}
                          <img
                            @click="
                              downloadFile(
                                contract.contract?.split('/').pop() ?? ''
                              )
                            "
                            style="
                              display: block;
                              user-select: none;
                              margin: auto auto auto 7px;
                              background-color: rgb(230, 230, 230);
                              transition: background-color 300ms;
                              width: 1.3rem;
                            "
                            src="@/components/icons/Download.png"
                            alt="Download"
                          />
                        </div>
                      </td>
                    </div>
                    <td>
                      <div v-if="contract.contractStatus == 1">
                        <img src="@/components/icons/inleaseterm.png" />
                      </div>
                      <div v-if="contract.contractStatus == 2">
                        <img src="@/components/icons/ae.png" />
                      </div>
                      <div v-if="contract.contractStatus == 3">
                        <img src="@/components/icons/pastexpiration.png" />
                      </div>
                    </td>
                    <td>
                      <a
                        @click="getContractByContractId(contract.contractId)"
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
          id="addNewExpensesModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-a4">
            <div class="modal-content modal-c">
              <div class="modal-body modal-b">
                <Contracts />
              </div>
            </div>
          </div>
        </div>

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
              <form @submit.prevent="updateContract(contract?.roomId)">
                <div class="modal-body" style="margin-left: 10px">
                  <p>
                    <i
                      ><img
                        src="../components/icons/eye.png"
                        style="width: 23px"
                    /></i>
                    View Details
                  </p>
                  <table style="width: 100%; font-size: 14px">
                    <thead
                      style="
                        color: #9b9b9b;
                        border-bottom: solid #b0b4cd 1px;
                        height: 45px;
                      "
                    >
                      <th style="width: 2rem">No.</th>
                      <th style="width: 6rem">Room No</th>
                      <th style="width: 10rem">Representative</th>
                      <th style="width: 7rem">Number of Tenants</th>
                      <th style="width: 7rem">
                        Rental Fee
                        <div>(VND)</div>
                      </th>
                      <th style="width: 10rem">
                        Security Deposit
                        <div>(VND)</div>
                      </th>
                      <th style="width: 9rem">Payment Cycle</th>
                      <th>Contract</th>
                      <th>Signing date</th>
                      <th>Move-in date</th>
                      <th>Expiration date</th>
                      <th style="width: 9rem">Contract Status</th>
                      <th>Action</th>
                    </thead>
                    <tbody>
                      <tr style="height: 50px">
                        <td>{{ contract?.id }}</td>
                        <td>{{ contract?.roomId }}</td>
                        <td>{{ contract?.representative }}</td>
                        <td>
                          {{ contract?.numberOfTenant }}
                        </td>
                        <td v-if="isEditing">
                          <input
                            type="number"
                            v-model="contract.rentalFee"
                            class="input-edit"
                          />
                        </td>
                        <td v-else>
                          {{ formatNumber(contract?.rentalFee) }}
                        </td>
                        <td v-if="isEditing">
                          <input
                            type="number"
                            v-model="contract.rentalFee"
                            class="input-edit"
                          />
                        </td>
                        <td v-else>
                          {{ formatNumber(contract?.securityDeposite) }}
                        </td>
                        <td v-if="isEditing">
                          <input
                            type="number"
                            v-model="contract.paymentCycle"
                            class="input-edit"
                            style="width: 2rem"
                          /><span>month</span>
                        </td>
                        <td v-else>{{ contract?.paymentCycle }} month</td>
                        <td>
                          {{
                            contract?.contract.substring(
                              contract.contract.lastIndexOf("/") + 1
                            )
                          }}
                          <a @click.prevent="viewFile(contract.contract)">
                            <i
                              ><img
                                src="../components/icons/eye.png"
                                style="width: 23px"
                            /></i>
                          </a>
                        </td>
                        <td v-if="isEditing">
                          <input
                            type="date"
                            v-model="contract.signinDate"
                            class="input-edit"
                            style="width: 8rem; text-align: center"
                          />
                        </td>
                        <td v-else>{{ contract?.signinDate }}</td>
                        <td v-if="isEditing">
                          <input
                            type="date"
                            v-model="contract.moveinDate"
                            class="input-edit"
                            style="width: 8rem; text-align: center"
                          />
                        </td>
                        <td v-else>{{ contract?.moveinDate }}</td>
                        <td v-if="isEditing">
                          <input
                            type="date"
                            v-model="contract.expireDate"
                            class="input-edit"
                            style="width: 8rem; text-align: center"
                          />
                        </td>
                        <td v-else>{{ contract?.expireDate }}</td>
                        <td v-if="isEditing">
                          <select
                            style="width: 8rem"
                            v-if="contract.contractStatus == 1"
                            class="payment-status-paid payment-status"
                            v-model="contract.contractStatus"
                          >
                            <option value="1" style="color: black">
                              In lease term
                            </option>
                            <option value="2" style="color: black">
                              Approaching Expiration
                            </option>
                            <option value="3" style="color: black">
                              Past Expiration
                            </option>
                          </select>
                          <select
                            style="width: 8rem"
                            v-if="contract.contractStatus == 2"
                            class="payment-status-partial payment-status"
                            v-model="contract.contractStatus"
                          >
                            <option value="1" style="color: black">
                              In lease term
                            </option>
                            <option value="2" style="color: black">
                              Approaching Expiration
                            </option>
                            <option value="3" style="color: black">
                              Past Expiration
                            </option>
                          </select>
                          <select
                            style="width: 8rem"
                            v-if="contract.contractStatus == 3"
                            class="payment-status-unpaid payment-status"
                            v-model="contract.contractStatus"
                          >
                            <option value="1" style="color: black">
                              In lease term
                            </option>
                            <option value="2" style="color: black">
                              Approaching Expiration
                            </option>
                            <option value="3" style="color: black">
                              Past Expiration
                            </option>
                          </select>
                        </td>
                        <td v-else>
                          <div v-if="contract?.contractStatus == 1">
                            <img
                              width="110rem"
                              src="@/components/icons/inleaseterm.png"
                            />
                          </div>
                          <div v-if="contract?.contractStatus == 2">
                            <img src="@/components/icons/ae.png" />
                          </div>
                          <div v-if="contract?.contractStatus == 3">
                            <img src="@/components/icons/pastexpiration.png" />
                          </div>
                        </td>

                        <td>
                          <a href="#" @click="editContract(contract?.id)"
                            ><i
                              ><img
                                src="../components/icons/PencilIcon.png"
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
                    @click="isEditing = false"
                    class="btn btn-cancel"
                    data-bs-dismiss="modal"
                  >
                    <a href="#" style="text-decoration: none; color: black"
                      >Cancel</a
                    >
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
import { ref, nextTick, computed } from "vue";
import type { Contract } from "@/type/Contract";
import contractService from "@/services/contractService";
import Swal from "sweetalert2";
import Contracts from "@/components/Contract.vue";
import apiClient from "@/utils/apiClient";
const contracts = ref<Contract[]>([]);
const contract = ref<Contract>() as any;
var searchValue = "";
let isEditing = false;
var totalElement = 0;
var totalPage = 0;
var currentPage = 0;
const inLeaseTerm = ref(false);
const approachingExpiration = ref(false);
const pastExpiration = ref(false);
const searchQuery = ref("");
const filteredContracts = computed(() => {
  return contracts.value.filter((contract) => {
    let match = true;

    if (inLeaseTerm.value) {
      match = match && contract.contractStatus === 1;
    }
    if (approachingExpiration.value) {
      match = match && contract.contractStatus === 2;
    }
    if (pastExpiration.value) {
      match = match && contract.contractStatus === 3;
    }
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      match =
        match &&
        (contract.roomId.toString().includes(query) ||
          contract.representative.toLowerCase().includes(query));
    }
    return match;
  });
});

const viewFile = async (fileName: string) => {
  try {
    // Xây dựng URL trực tiếp tới tệp PDF
    const fileURL = `${fileName}`;

    // Mở URL trực tiếp trong tab mới
    const newWindow = window.open(fileURL, "_blank");
    if (newWindow) {
      newWindow.focus();
    } else {
      throw new Error(
        "Unable to open new window. Please check your browser settings."
      );
    }
  } catch (error) {
    console.error("Error opening the file:", error);
  }
};
const downloadFile = (fileName: string) => {
  apiClient({
    url: `contract/download/${fileName}`,
    method: "GET",
    responseType: "blob",
  })
    .then((response) => {
      const contentDisposition = response.headers["content-disposition"];
      let extractedFileName = fileName;

      // Kiểm tra nếu header 'Content-Disposition' có chứa tên file
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length === 2) {
          extractedFileName = fileNameMatch[1];
        }
      }

      // Đảm bảo tên file có đuôi '.pdf'
      if (!extractedFileName.endsWith(".pdf")) {
        extractedFileName += ".pdf";
      }

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", extractedFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error("There was an error downloading the file!", error);
    });
};

const timeFomat = (dateString: string) => {
  return dateString + "T17:00:00.000+00:00";
};
function formatNumber(value: number | undefined): string {
  if (value === undefined) return "";
  return value.toLocaleString("vi-VN");
}
const editContract = async (id: number) => {
  console.log(id);
  contractService.getContractById(id).then((response) => {
    contract.value = response.map(
      (contract: {
        id: any;
        roomId: any;
        representative: any;
        numberOfTenant: any;
        rentalFee: any;
        securityDeposite: any;
        paymentCycle: any;
        contract: any;
        signinDate: any;
        moveinDate: any;
        expireDate: any;
        contractStatus: any;
      }) => ({
        id: contract.id,
        roomId: contract.roomId,
        representative: contract.representative,
        numberOfTenant: contract.numberOfTenant,
        rentalFee: contract.rentalFee,
        securityDeposite: contract.securityDeposite,
        paymentCycle: contract.paymentCycle,
        contract: contract.contract,
        signinDate: contract.signinDate,
        moveinDate: contract.moveinDate,
        expireDate: contract.expireDate,
        contractStatus: contract.contractStatus,
      })
    );
  });
  await nextTick(() => {
    isEditing = true;
  });
};
const getContractPanigation = (pageNo: number) => {
  contractService.getAllContract(pageNo, searchValue).then((response) => {
    contracts.value = response.content.map(
      (contracts: {
        id: any;
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
          id: contracts.id,
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

const getContractByContractId = async (contractId: string) => {
  try {
    const response = await contractService.getContractByContractId(contractId);
    contract.value = {
      id: response.id,
      contractId: response.contractId,
      roomId: response.roomId,
      numberOfTenant: response.numberOfTenant,
      rentalFee: response.rentalFee,
      securityDeposite: response.securityDeposite,
      paymentCycle: response.paymentCycle,
      contract: response.contract,
      signinDate: formatDate(response.signinDate),
      moveinDate: formatDate(response.moveinDate),
      expireDate: formatDate(response.expireDate),
      contractStatus: response.contractStatus,
      representative: response.representative,
    };
    // console.log(contract);
    // return contract;
  } catch (error) {
    console.error("Error fetching contract data:", error);
    return null;
  }
};

const updateContract = async (roomId: number) => {
  isEditing = false;
  console.log("Payload:", contract.value);
  contractService
    .updateContract(roomId, contract.value)
    .then((response) => {
      console.log(response);
      Swal.fire({
        title: "Success!",
        text: "Updated successfully.",
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch((error) => {
      console.error("Error updating contract:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update contract.",
        icon: "error",
        showConfirmButton: true,
      });
    });
};
getContractPanigation(0);
const formatDate = (dateString: string) => {
  return dateString.split("T")[0];
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");
.mt-4 .checkbox {
  background-color: rgba(176, 180, 205, 1);
  margin-left: 7rem;
  --el-border-radius-base: 11px;
}
.container {
  background: white;
  margin-top: 20px;
  box-shadow: -2px -1px 9px 0px rgba(0, 0, 0, 0.25);
  font-family: "Poppins", sans-serif;
  border-radius: 14px;
  max-width: 83%;
  margin-left: 20px;
  min-height: 86vh;
}
.sidebar {
  width: 18%;
}
.card {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  border: none;
}

.line-blue {
  width: 4px;
  background-color: #0064ff;
  height: 40px;
  margin-right: 12px;
}

.input-search {
  outline: none;
  border: none;
  border-radius: 17px;
  background-color: #e9e9e9;
  padding: 7px;
  width: 20rem;
}
.payment-status {
  border-radius: 6px;
  width: 94px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  justify-content: center;
}

.payment-status-paid {
  color: #009d3f;
  border: solid 2px #00d656fe;
  height: 27px;
}

.payment-status-partial {
  color: #ffbd5a;
  border: solid 2px #ffd79b;
  height: 27px;
}

.payment-status-unpaid {
  color: #fb2424;
  border: solid 2px #ff7d7d;
  height: 27px;
}
.btn {
  height: 30px;
  border-radius: 12px;
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
/* Đặt kích thước của modal gần với kích thước của trang A4 */
.modal-dialog.modal-a4 {
  max-width: 35cm; /* Chiều rộng của khổ A4 */
  min-height: 29.7cm; /* Chiều cao của khổ A4 */
  margin-top: 0;
}

.modal-content {
  height: 100%;
}

.modal-body {
  height: calc(100% - 2rem);
  padding: 1rem;
}
</style>

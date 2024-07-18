<template>
  <div style="display: flex; height: 100%">
    <SideBar />
    <div class="container">
      <div class="card">
        <div style="display: flex">
          <div class="line-blue"></div>
          <div>
            <h3>List of Lease Contracts</h3>
          </div>
        </div>
        <div>
          <div
            style="display: flex; justify-content: center; margin-bottom: 23px"
          >
            <img
              src="../components/icons/searchIcon.png"
              style="width: 2%; height: 2%; margin-top: 8px"
            />
            <input
              type="text"
              v-model="searchValue"
              class="input-search"
              placeholder="Please enter contract details"
            />
          </div>
          <div style="display: flex; justify-content: flex-end">
            <p style="margin-right: 31px; margin-bottom: 12px">
              Total: {{ clientItemsLength }}
            </p>
          </div>
          <EasyDataTable
            buttons-pagination
            :headers="headersContract"
            :items="contracts"
            :search-value="searchValue"
            show-index
            :must-sort="true"
            :rows-per-page="10"
            table-class-name="customize-table"
          >
            <template #item-action="item">
              <a
                @click="showContractDetails(item.contractId)"
                data-bs-toggle="modal"
                data-bs-target="#contractDetailModal"
              >
                <i
                  ><img
                    src="../components/icons/eye.png"
                    style="width: 23px" /></i
              ></a>
            </template>
            <template #item-contractStatus="item">
              <span v-if="item.contractStatus === 1">In Lease Term</span>
              <span v-if="item.contractStatus === 2"
                >Approaching Expiration</span
              >
              <span v-if="item.contractStatus === 3">Past Expiration</span>
            </template>
          </EasyDataTable>
        </div>
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
              <form @submit.prevent="saveContractStatus">
                <div class="modal-body">
                  <p>
                    <i
                      ><img
                        src="../components/icons/eye.png"
                        style="width: 23px"
                    /></i>
                    View Details
                  </p>
                  <table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Room No</th>
                        <th>Representative</th>
                        <th>Number of Tenants</th>
                        <th>Rental Fee(VND)</th>
                        <th>Security Deposit(VND)</th>
                        <th>Payment Cycle</th>
                        <th>Contract</th>
                        <th>Signing Date</th>
                        <th>Move-in Date</th>
                        <th>Expiration Date</th>
                        <th>Contract Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="tempContractDetail">
                        <td>{{ tempContractDetail.contractId }}</td>
                        <td>{{ tempContractDetail.roomId }}</td>
                        <td>{{ tempContractDetail.representative }}</td>
                        <td>{{ tempContractDetail.numberOfTenant }}</td>
                        <td>{{ tempContractDetail.rentalFee }}</td>
                        <td>{{ tempContractDetail.securityDeposite }}</td>
                        <td>{{ tempContractDetail.paymentCycle }}</td>
                        <td>{{ tempContractDetail.contract }}</td>
                        <td>{{ tempContractDetail.signinDate }}</td>
                        <td>{{ tempContractDetail.moveinDate }}</td>
                        <td>{{ tempContractDetail.expireDate }}</td>
                        <td>
                          <select v-model="tempContractDetail.contractStatus">
                            <option value="1">In Lease Term</option>
                            <option value="2">Approaching Expiration</option>
                            <option value="3">Past Expiration</option>
                          </select>
                        </td>
                        <td>
                          <a @click="allowEdit"
                            ><i
                              ><img
                                src="../components/icons/PencilIcon.png"
                                style="width: 23px" /></i
                          ></a>
                        </td>
                      </tr>
                      <tr v-else>
                        <td colspan="13">Loading...</td>
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
import { computed, ref } from "vue";
import type { Contract } from "@/type/Contract";
import contractService from "@/services/contractService";
import type { Header } from "vue3-easy-data-table";
import Swal from "sweetalert2";
const allowEdit = () => {
  $("#tenantDetailModal").modal("hide");
};
const contracts = ref<Contract[]>([]);
const contractDetail = ref<Contract | null>(null);
const tempContractDetail = ref<Contract | null>(null);
const searchValue = ref("");
const dataTable = ref();
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);

const showContractDetails = (contractId: number) => {
  contractDetail.value = null; // Reset contractDetail before fetching new details
  contractService.getContractByContractId(contractId).then((response) => {
    contractDetail.value = response;
    tempContractDetail.value = { ...response }; // Copy the response to the temporary variable
  });
};

const saveContractStatus = () => {
  if (tempContractDetail.value) {
    contractService
      .updateContractStatus(
        tempContractDetail.value.contractId,
        tempContractDetail.value.contractStatus
      )
      .then(() => {
        Swal.fire("Success", "Contract status updated successfully", "success");
        // Update the original contract detail with the temp values
        contractDetail.value = { ...tempContractDetail.value };

        // Optionally, update the local contracts array to reflect the change
        const contract = contracts.value.find(
          (c) => c.contractId === tempContractDetail.value.contractId
        );
        if (contract) {
          contract.contractStatus = tempContractDetail.value.contractStatus;
        }
        setTimeout(() => {
          window.location.reload();
        }, 1500);

        // Close the modal
        const contractDetailModal = document.getElementById(
          "contractDetailModal"
        ) as any;
        if (contractDetailModal) {
          contractDetailModal.classList.remove("show");
          contractDetailModal.setAttribute("aria-hidden", "true");
          contractDetailModal.setAttribute("style", "display: none;");
          const modalBackdrop = document.querySelector(".modal-backdrop");
          if (modalBackdrop) {
            modalBackdrop.remove();
          }
        }
      })
      .catch((error) => {
        Swal.fire("Error", "Failed to update contract status", "error");
      });
  }
};

contractService.getAllContract().then((response) => {
  contracts.value = response.map((contract) => ({
    contractId: contract.contractId,
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
  }));
});

const headersContract: Header[] = [
  { text: "Contract ID", value: "contractId", sortable: true },
  { text: "Room No", value: "roomId", sortable: true },
  { text: "Representative", value: "representative", sortable: true },
  { text: "Number of Tenants", value: "numberOfTenant", sortable: true },
  { text: "Rental Fee (VND)", value: "rentalFee", sortable: true },
  { text: "Payment Cycle", value: "paymentCycle", sortable: true },
  { text: "Contract Status", value: "contractStatus", sortable: true },
  { text: "Action", value: "action" },
];

const headersContractDetail: Header[] = [
  { text: "No.", value: "id", width: 150 },
  { text: "Room No", value: "roomId" },
  { text: "Representative", value: "representative" },
  { text: "Number of Tenants", value: "numberOfTenants" },
  { text: "Rental Fee (VND)", value: "rentalFee" },
  { text: "Security Deposit (VND)", value: "securityDeposit" },
  { text: "Payment Cycle", value: "paymentCycle" },
  { text: "Contract", value: "" },
  { text: "Signing Date", value: "signingDate" },
  { text: "Move-in Date", value: "moveInDate" },
  { text: "Expiration Date", value: "expirationDate" },
  { text: "Contract Status", value: "contractStatus" },
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

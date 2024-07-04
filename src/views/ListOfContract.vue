<template>
    <div style="display: flex;">
        <SideBar />
        <div class="container">
            <div class="card">
                <div style="display: flex;">
                    <div class="line-blue"></div>
                    <div>
                        <h3>List of Lease Contracts</h3>
                    </div>
                </div>
                <div>
                    <div style="display: flex; justify-content: center; margin-bottom: 23px;">
                        <img src="../components/icons/searchIcon.png" style="width: 2%; height: 2%; margin-top: 8px;">
                        <input type="text" v-model="searchValue" class="input-search" placeholder="Please enter contract details">
                    </div>
                    <div style="display: flex; justify-content: flex-end;">
                        <p style="margin-right: 31px; margin-bottom: 12px;">Total: {{ clientItemsLength }}</p>
                    </div>
                    <EasyDataTable ref="dataTable" buttons-pagination :headers="headersContract" :items="contracts"
                                   :search-value="searchValue" show-index :must-sort="true" :rows-per-page="10"
                                   table-class-name="customize-table">
                        <template #item-action="item">
                            <a @click="getContractDetails(item.contractId)" data-bs-toggle="modal" data-bs-target="#contractDetailModal">
                                <i><img src="../components/icons/eye.png" style="width: 23px;"></i></a>
                            <a href="#" @click="() => deleteContract(item.contractId)">
                                <i><img src="../components/icons/TrashIcon.png" style="width: 23px;"></i></a>
                        </template>
                    </EasyDataTable>
                </div>
                <!-- Modal -->
                <div class="modal fade" id="contractDetailModal" tabindex="-1" aria-labelledby="contractDetailModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" style="max-width: 100%;">
                        <div class="modal-content">
                            <form>
                                <div class="modal-body">
                                    <p><i><img src="../components/icons/eye.png" style="width: 23px;"></i> View Details</p>
                                    <EasyDataTable :headers="headersContractDetail" :items="contractDetail" hide-footer
                                                   show-index table-class-name="customize-table">
                                        <template #item-action="item">
                                            <a @click="allowEdit">
                                                <i><img src="../components/icons/PencilIcon.png" style="width: 23px;"></i></a>
                                            <a href="#" @click="() => deleteContract(item.contractId)">
                                                <i><img src="../components/icons/TrashIcon.png" style="width: 23px;"></i></a>
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
import type { Contract } from '@/type/Contract';
import contractService from '@/services/contractService';
import type { Header } from "vue3-easy-data-table";
import Swal from 'sweetalert2';

const contracts = ref<Contract[]>([]);
const contractDetail = ref<Contract[]>([]);
const searchValue = ref("");
const dataTable = ref();
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);
let isEdit = false;
const allowEdit = () => {
    $('#contractDetailModal').modal('hide');
}
const deleteContract = (contractId: string) => {
    Swal.fire({
        text: "Are you sure you want to delete?",
        showCancelButton: true,
        confirmButtonColor: "#0565F9",
        confirmButtonText: "Delete",
        cancelButtonColor: "#E8E7E7",
    }).then((result) => {
        if (result.isConfirmed) {
            contractService.deleteContract(contractId)
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
const getContractDetails = (contractId: number) => {
    contractService.getContractByContractId(contractId).then((response) => {
        contracts.value = response.map(contract => ({
            contractId: contract.contractId,
            roomId: contract.roomId,
            representative: contract.representative,
            numberOfTenants: contract.numberOfTenants,
            rentalFee: contract.rentalFee,
            securityDeposit: contract.securityDeposit,
            paymentCycle: contract.paymentCycle,
            signingDate: contract.signingDate,
            moveInDate: contract.moveInDate,
            expirationDate: contract.expirationDate,
            contractStatus: contract.contractStatus,
        }));
    });
}
contractService.getAllContract().then((response) => {
    contracts.value = response.map(contract => ({
        contractId: contract.contractId,
        roomId: contract.roomId,
        representative: contract.representative,
        numberOfTenants: contract.numberOfTenants,
        rentalFee: contract.rentalFee,
        paymentCycle: contract.paymentCycle,
        contractStatus: contract.contractStatus,
    }));
});

const headersContract: Header[] = [
    { text: "No.", value: "id", sortable: true },
    { text: "Contract ID", value: "contractId", sortable: true },
    { text: "Room No", value: "roomId", sortable: true },
    { text: "Representative", value: "representative", sortable: true },
    { text: "Number of Tenants", value: "numberOfTenants", sortable: true },
    { text: "Rental Fee (VND)", value: "rentalFee", sortable: true },
    { text: "Payment Cycle", value: "paymentCycle", sortable: true },
    { text: "Contract Status", value: "contractStatus", sortable: true },
    { text: "Action", value: "action" },
];

const headersContractDetail: Header[] = [
    { text: "No.", value: "id", width: 150 },
    { text: "Contract ID", value: "contractId" },
    { text: "Room No", value: "roomId" },
    { text: "Representative", value: "representative" },
    { text: "Number of Tenants", value: "numberOfTenants" },
    { text: "Rental Fee (VND)", value: "rentalFee" },
    { text: "Security Deposit (VND)", value: "securityDeposit" },
    { text: "Payment Cycle", value: "paymentCycle" },
    { text: "Signing Date", value: "signingDate" },
    { text: "Move-in Date", value: "moveInDate" },
    { text: "Expiration Date", value: "expirationDate" },
    { text: "Contract Status", value: "contractStatus" },
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
    border-radius: 5px;
}
</style>

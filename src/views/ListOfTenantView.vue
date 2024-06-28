<!-- eslint-disable vue/require-v-for-key -->
<template>
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
                <EasyDataTable buttons-pagination :headers="headers" :items="tenant" :search-value="searchValue"
                     show-index :must-sort="true" :rows-per-page="10" hide-footer>
                    <template v-slot:cell-profileLink="{ items }">
                        <a :href="`/profile/${items}`">View Profile</a>
                    </template>
                </EasyDataTable>
                <div class="customize-footer">
                    <div class="customize-rows-per-page">
                        <select class="select-items" @change="updateRowsPerPageSelect">
                            <option v-for="item in rowsPerPageOptions" :key="item"
                                :selected="item === rowsPerPageActiveOption" :value="item">
                                {{ item }} rows per page
                            </option>
                        </select>
                    </div>

                    <div class="customize-index">
                        Now displaying: {{ currentPageFirstIndex }} ~ {{ currentPageLastIndex }} of {{ clientItemsLength }}
                    </div>

                    <div class="customize-buttons">
                        <span v-for="paginationNumber in maxPaginationNumber" class="customize-button"
                            :class="{ 'active': paginationNumber === currentPaginationNumber }"
                            @click="updatePage(paginationNumber)">
                            {{ paginationNumber }}
                        </span>
                    </div>

                    <div class="customize-pagination">
                        <button class="prev-page" @click="prevPage" :disabled="isFirstPage">prev page</button>
                        <button class="next-page" @click="nextPage" :disabled="isLastPage">next page</button>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref } from "vue";
import type { Tenant } from '@/type/Tenant'
import tenantService from '@/services/tenantService';
import type { Header } from "vue3-easy-data-table";
import type { UsePaginationReturn, UseRowsPerPageReturn } from "use-vue3-easy-data-table";
import { usePagination, useRowsPerPage } from "use-vue3-easy-data-table";

const tenant = ref<Tenant[]>([]);
const searchValue = ref("");
const dataTable = ref();

const {
    currentPageFirstIndex,
    currentPageLastIndex,
    clientItemsLength,
    maxPaginationNumber,
    currentPaginationNumber,
    isFirstPage,
    isLastPage,
    nextPage,
    prevPage,
    updatePage,
}: UsePaginationReturn = usePagination(dataTable);
const {
  rowsPerPageOptions,
  rowsPerPageActiveOption,
  updateRowsPerPageActiveOption,
}: UseRowsPerPageReturn = useRowsPerPage(dataTable);

const updateRowsPerPageSelect = (e: Event) => {
  updateRowsPerPageActiveOption(Number((e.target as HTMLInputElement).value));
};


tenantService.getAllTenant().then((response) => {
    tenant.value = response.map(tenant => ({
        email: tenant.email,
        roomId: tenant.roomId,
        career: tenant.career,
        licensePlate: tenant.licensePlate,
        vehicleType: tenant.vehicleType,
        vehicleColor: tenant.vehicleColor,
        representative: tenant.representative,
        residenceStatus: tenant.residenceStatus,
        contractId: tenant.contractId,
        dateOfBirth: tenant.dateOfBirth,
        firstName: tenant.firstName,
        lastName: tenant.lastName,
        gender: tenant.gender,
        userId: tenant.userId,
        contact: tenant.contact,
        fullName: `${tenant.firstName} ${tenant.lastName}`,
        profileLink: `/profile/${tenant.userId}`
    }));
});

const headers: Header[] = [
    { text: "Full Name", value: "fullName", sortable: true },
    { text: "Room No", value: "roomId", sortable: true },
    { text: "Gender", value: "gender", sortable: true },
    { text: "D.O.B", value: "dateOfBirth", sortable: true },
    { text: "Mobile No", value: "contact", sortable: true },
    { text: "Email ID", value: "email", sortable: true },
    { text: "Citizen ID", value: "userId", sortable: true },
    { text: "Career", value: "career", sortable: true },
    { text: "License plate", value: "licensePlate", sortable: true },
    { text: "Action", value: "profileLink" },
    { text: "Operation", value: "operation" },
    // { text: "email", value: "email" },
    // { text: "email", value: "email" },
    // { text: "roomId", value: "roomId", sortable: true},
    // { text: "vehicleType", value: "vehicleType"},
    // { text: "vehicleColor", value: "vehicleColor"},
    // { text: "representative", value: "representative", width: 200},
    // { text: "residenceStatus", value: "residenceStatus"},
];
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');

.container {
    background: white;
    margin-top: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    font-family: 'Poppins', sans-serif;
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
</style>
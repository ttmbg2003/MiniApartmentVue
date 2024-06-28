<!-- eslint-disable vue/require-v-for-key -->
<template>
  <EasyDataTable
    ref="dataTable"
    :headers="headers"
    :items="tenant"
    :rows-per-page="10"
    hide-footer
  />
  
  <div class="customize-footer">
    <div class="customize-rows-per-page">
      <select
        class="select-items"
        @change="updateRowsPerPageSelect"
      >
        <option
          v-for="item in rowsPerPageOptions"
          :key="item"
          :selected="item === rowsPerPageActiveOption"
          :value="item"
        >
          {{ item }} rows per page
        </option>
      </select>
    </div>

    <div class="customize-index">
      Now displaying: {{currentPageFirstIndex}} ~ {{currentPageLastIndex}} of {{clientItemsLength}}
    </div>
  
    <div class="customize-buttons">
      <span
        v-for="paginationNumber in maxPaginationNumber"
        class="customize-button"
        :class="{'active': paginationNumber === currentPaginationNumber}"
        @click="updatePage(paginationNumber)"
      >
        {{paginationNumber}}
      </span>
    </div>
  
    <div class="customize-pagination">
      <button class="prev-page" @click="prevPage" :disabled="isFirstPage">prev page</button>
      <button class="next-page" @click="nextPage" :disabled="isLastPage">next page</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Header, Item } from "vue3-easy-data-table";
import { computed, ref } from "vue";
import { usePagination, useRowsPerPage } from "use-vue3-easy-data-table";
import type { UsePaginationReturn, UseRowsPerPageReturn } from "use-vue3-easy-data-table";
import type { Tenant } from "@/type/Tenant";
import tenantService from "@/services/tenantService";

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
    { text: "Operation", value: "operation"},
];
const tenant = ref<Tenant[]>([]);
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

</script>
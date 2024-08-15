<template>
  <div
    style="display: flex; height: 100%; width: 100%; background-color: #f5f6f8"
  >
    <SideBar class="sidebar" />
    <div class="main-screen">
      <div style="font-weight: 600; font-size: 24px; margin-left: 36px">
        Report
      </div>
      <div class="container">
        <div class="top-elements">
          <div>
            <div class="top-title">Total Rooms</div>
            <div style="font-weight: 700; font-size: 28px">
              {{ totalRooms }}
            </div>
          </div>
          <div class="top-icon-bg" style="background: #fff3d6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0,0,256,256"
              width="26px"
              height="25px"
            >
              <g
                fill="#ff9500"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style="mix-blend-mode: normal"
              >
                <g transform="scale(5.12,5.12)">
                  <path
                    d="M24.96289,1.05469c-0.20987,0.00724 -0.41214,0.08036 -0.57812,0.20898l-23,17.94727c-0.43579,0.33978 -0.51361,0.96851 -0.17383,1.4043c0.33978,0.43579 0.96851,0.51361 1.4043,0.17383l1.38477,-1.08008v26.29102c0.00006,0.55226 0.44774,0.99994 1,1h13.83203c0.10799,0.01785 0.21818,0.01785 0.32617,0h11.67383c0.10799,0.01785 0.21818,0.01785 0.32617,0h13.8418c0.55226,-0.00006 0.99994,-0.44774 1,-1v-26.29102l1.38477,1.08008c0.2819,0.21983 0.65967,0.27257 0.991,0.13833c0.33133,-0.13423 0.56586,-0.43504 0.61526,-0.7891c0.0494,-0.35406 -0.09386,-0.70757 -0.37579,-0.92736l-7.61523,-5.94141v-7.26953h-6v2.58594l-9.38477,-7.32227c-0.18607,-0.14428 -0.41707,-0.21828 -0.65234,-0.20898zM25,3.32227l19,14.82617v26.85156h-12v-19h-14v19h-12v-26.85156zM37,8h2v3.70898l-2,-1.5625zM20,28h10v17h-10z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div class="top-elements">
          <div>
            <div class="top-title" style="margin-top: 15px">Total Tenants</div>

            <div
              style="
                display: flex;
                align-items: baseline;
                font-weight: 500;
                font-size: 28px;
              "
            >
              <div style="font-weight: 700; font-size: 32px">
                {{ totalTenants }}
              </div>
              /120
            </div>

            <div
              v-if="tenantRateDiff > 0"
              style="display: flex; align-items: baseline"
            >
              <font-awesome-icon
                :icon="['fas', 'arrow-trend-up']"
                style="color: #5ddf95"
              />
              <p style="color: #5ddf95; margin-left: 5px">
                {{ tenantRateDiff }}%
              </p>
            </div>
            <div v-else-if="tenantRateDiff == 0" style="height: 2.5rem"></div>
            <div v-else style="display: flex; align-items: baseline">
              <font-awesome-icon
                :icon="['fas', 'arrow-trend-down']"
                style="color: #ff0000"
              />
              <p style="color: #ff0000; margin-left: 5px">
                {{ -tenantRateDiff }}%
              </p>
            </div>
          </div>
          <div class="top-icon-bg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 64 64"
              fill="none"
            >
              <circle
                cx="32"
                cy="32"
                r="32"
                fill="#2715FA"
                fill-opacity="0.08"
              />
              <path
                opacity="0.3"
                d="M40.0001 34.6667C37.7909 34.6667 36.0001 32.8758 36.0001 30.6667C36.0001 28.4575 37.7909 26.6667 40.0001 26.6667C42.2092 26.6667 44.0001 28.4575 44.0001 30.6667C44.0001 32.8758 42.2092 34.6667 40.0001 34.6667ZM28.0001 30.6667C25.0546 30.6667 22.6667 28.2789 22.6667 25.3333C22.6667 22.3878 25.0546 20 28.0001 20C30.9456 20 33.3334 22.3878 33.3334 25.3333C33.3334 28.2789 30.9456 30.6667 28.0001 30.6667Z"
                fill="#6C15FA"
              />
              <path
                d="M39.4683 36.0009C44.0103 36.0505 47.7189 38.3469 47.998 43.2C48.0092 43.3955 47.998 44 47.2746 44H42.1333C42.1333 40.9988 41.1417 38.2292 39.4683 36.0009ZM16.0009 42.9323C16.5177 36.5687 21.6825 33.3334 27.9778 33.3334C34.3616 33.3334 39.6065 36.391 39.9972 42.9334C40.0128 43.194 39.9972 44 38.9956 44C34.0548 44 26.713 44 16.97 44C16.6356 44 15.9727 43.2789 16.0009 42.9323Z"
                fill="#6C15FA"
              />
            </svg>
          </div>
        </div>
        <div class="top-elements">
          <div>
            <div class="top-title" style="margin-top: 15px">
              On-time payment Rate
            </div>

            <div style="font-weight: 700; font-size: 28px">
              {{ paymentRate }}%
            </div>

            <div
              v-if="paymentRateDiff > 0"
              style="display: flex; align-items: baseline"
            >
              <font-awesome-icon
                :icon="['fas', 'arrow-trend-up']"
                style="color: #5ddf95"
              />
              <p style="color: #5ddf95; margin-left: 5px">
                {{ paymentRateDiff }}%
              </p>
            </div>
            <div v-else-if="paymentRateDiff == 0" style="height: 2.5rem"></div>
            <div v-else style="display: flex; align-items: baseline">
              <font-awesome-icon
                :icon="['fas', 'arrow-trend-down']"
                style="color: #ff0000"
              />
              <p style="color: #ff0000; margin-left: 5px">
                {{ -paymentRateDiff }}%
              </p>
            </div>
          </div>
          <div class="top-icon-bg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xml:space="preserve"
              id="Layer_1"
              x="0"
              y="0"
              version="1.1"
              viewBox="0 0 34 35"
            >
              <circle cx="17" cy="17" r="17" fill="#e7f5f0" />
              <path
                d="m10.3 13.2.2.1.1.1v.2l-.1.2-.2.1h-.2l-.1-.1v-.3l.1-.2.2-.1zm10.8 4.4.2.1.1.1v.2l-.1.2-.2.1h-.2l-.1-.1-.1-.2.1-.2.3-.2z"
                class="st1"
              />
              <path
                d="M22.7 10.7h-14c-.7 0-1.3.6-1.3 1.3v7.6c0 .7.6 1.3 1.3 1.3h14c.7 0 1.3-.6 1.3-1.3V12c0-.8-.6-1.3-1.3-1.3z"
                class="st1"
              />
              <path
                d="M15.7 18.3c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5-2.5 1.1-2.5 2.5c0 1.3 1.1 2.5 2.5 2.5zm10.8-3.8v7.6c0 .3-.1.7-.4.9-.2.2-.6.4-.9.4h-14"
                class="st1"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="container" style="margin-top: 0">
        <div class="mid-elements">
          <RoomChartView
            :month="currentDate.getMonth() + 1"
            :year="currentDate.getFullYear()"
          />
          <div
            class="detailBtn"
            @click="openDetailView(), (selectedView = 'room')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g>
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1H7zM5.002 8L5 20h10V8H5.002zM9 6h8v10h2V4H9v2zm-2 5h6v2H7v-2zm0 4h6v2H7v-2z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div class="mid-elements">
          <TenantChartViewVue />
          <div
            class="detailBtn"
            @click="openDetailView(), (selectedView = 'tenant')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g>
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1H7zM5.002 8L5 20h10V8H5.002zM9 6h8v10h2V4H9v2zm-2 5h6v2H7v-2zm0 4h6v2H7v-2z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div class="mid-elements">
          <PaymentChartView />
          <div
            class="detailBtn"
            @click="openDetailView(), (selectedView = 'payment')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g>
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1H7zM5.002 8L5 20h10V8H5.002zM9 6h8v10h2V4H9v2zm-2 5h6v2H7v-2zm0 4h6v2H7v-2z"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div class="container" style="margin-top: 0">
        <div class="bottom1"><MaintenanceChartView /></div>
        <div class="bottom2"><TenantSatView /></div>
      </div>
    </div>
    <div v-if="displayDetailView" class="detailView">
      <RoomDetailsView v-if="selectedView == 'room'" ref="modalRef" />
      <TenantDetailsView v-if="selectedView == 'tenant'" ref="modalRef" />
      <PaymentRateView v-if="selectedView == 'payment'" ref="modalRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
import RoomChartView from "./RoomChartView.vue";
import TenantChartViewVue from "./TenantChartView.vue";
import PaymentChartView from "./PaymentChartView.vue";
import MaintenanceChartView from "./MaintenanceChartView.vue";
import TenantSatView from "./TenantSatView.vue";

import RoomDetailsView from "./detail/RoomDetailsView.vue";
import TenantDetailsView from "./detail/TenantDetailsView.vue";
import PaymentRateView from "./detail/PaymentRateView.vue";

import reportService from "@/services/reportService";

import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const displayDetailView = ref(false);
const modalRef = ref(null);
const selectedView = ref("");

onClickOutside(modalRef, (event) => {
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    (navbar as HTMLElement).style.zIndex = "1";
  }
  displayDetailView.value = false;
});

function openDetailView() {
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    (navbar as HTMLElement).style.zIndex = "0";
  }
  displayDetailView.value = true;
}

const totalRooms = ref(0);
reportService.getTotalRooms().then((res) => {
  totalRooms.value = res;
});

const totalTenants = ref(0);
const currentDate = new Date();
reportService.getTotaltenant(currentDate.getMonth() + 1).then((res) => {
  totalTenants.value = res;
});
//get tenant data
const tenantRateByMonth = ref([]);
const tenantRateDiff = ref(0);
interface tenantsEachMonth {
  month: number;
  tenants: number;
}
reportService.getTenantByMonths().then((res) => {
  tenantRateByMonth.value = res.map((item: tenantsEachMonth) =>
    parseFloat(formatPercentageForTenant(item.tenants))
  );

  //change rate difference
  tenantRateDiff.value =
    tenantRateByMonth.value[currentDate.getMonth()] -
    (currentDate.getMonth() - 1 == -1
      ? 0
      : tenantRateByMonth.value[currentDate.getMonth() - 1]);

  console.log(currentDate.getMonth());
  console.log(tenantRateDiff.value);
});
function formatPercentageForTenant(tenant: number) {
  const percent = (tenant / 120) * 100;
  return percent % 1 === 0 ? percent.toFixed(0) : percent.toFixed(1);
}

//get on-time rate data
const paymentRate = ref(0);
const rateByMonth = ref([]);
const paymentRateDiff = ref(0);

interface onTimePaymentRate {
  month: number;
  rooms: number;
  onTimeRooms: number;
}
reportService.getOntimePaymentMonths().then((res) => {
  //sort theo month sau đó đưa vào list
  res.sort((a: onTimePaymentRate, b: onTimePaymentRate) => a.month - b.month);
  rateByMonth.value = res.map((item: onTimePaymentRate) =>
    parseFloat(formatPercentage(item.rooms, item.onTimeRooms))
  );

  //update on-time rate in top title
  paymentRate.value = rateByMonth.value[currentDate.getMonth()];
  paymentRateDiff.value =
    rateByMonth.value[currentDate.getMonth()] -
    (currentDate.getMonth() - 1 == -1
      ? 0
      : rateByMonth.value[currentDate.getMonth() - 1]);
});
function formatPercentage(room: number, onTimeRoom: number) {
  const percent = (onTimeRoom / room) * 100;
  return percent % 1 === 0 ? percent.toFixed(0) : percent.toFixed(1);
}
</script>

<style scoped>
.sidebar {
  width: 18%;
}
.main-screen {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  margin: 0px 20px 0 0;
}
.container {
  display: flex;
  width: 100%;
  margin: 20px 0 20px 0;
  justify-content: space-between;
}
.top-elements {
  width: 32%;
  height: 120px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 0px 25px 0px 25px;
}
.top-title {
  color: #6d6d6d;
  font-size: 18px;
  margin-bottom: 10px;
}
.top-icon-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 22px;
}
.st1 {
  fill: none;
  stroke: #007b4a;
  stroke-width: 1.2698;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.mid-elements {
  width: 32%;
  height: 270px;
  background: white;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  border-radius: 10px;
  padding: 0px 25px 0px 25px;
  margin-bottom: 0;
}
.detailBtn {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 3px;
  right: 10px;
}
.detailBtn:hover {
  cursor: pointer;
}
.detailView {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.33);
  margin-top: -4.4rem;
  overflow-y: scroll; /* hoặc auto */
  scrollbar-width: none;
}
.detailView::-webkit-scrollbar {
  display: none; /* Safari và Chrome */
}
.bottom1 {
  background: white;
  height: 220px;
  width: 42%;
  border-radius: 10px;
  padding: 0px 25px 0px 25px;
}
.bottom2 {
  background: white;
  height: 220px;
  width: 55%;
  border-radius: 10px;
  padding: 0px;
}
</style>

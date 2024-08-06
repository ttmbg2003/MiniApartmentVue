<template>
  <div class="paymentView">
    <div class="header">
      <div class="title">
        <div style="width: 30px; height: 30px">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="rgba(5, 101, 249, 1)"
                d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1H7zM5.002 8L5 20h10V8H5.002zM9 6h8v10h2V4H9v2zm-2 5h6v2H7v-2zm0 4h6v2H7v-2z"
              />
            </g>
          </svg>
        </div>
        <div
          style="
            font-weight: 600;
            font-size: 24px;
            color: rgba(5, 101, 249, 1);
            margin-left: 0.5rem;
          "
        >
          On-time Payment Rate Details
        </div>
      </div>
      <select disabled>
        <option value="0">August</option>
        <option value="1">September</option>
        <option value="2">October</option>
        <option value="3">November</option>
      </select>
    </div>
    <div class="mid">
      <div class="mid1">
        <div class="top-elements">
          <div>
            <div class="top-title" style="margin-top: 1rem">
              On-time payment Rate
            </div>

            <div style="font-weight: 700; font-size: 24px">
              {{ paymentRate }}%
            </div>

            <div style="display: flex; align-items: baseline">
              <font-awesome-icon
                :icon="['fas', 'arrow-trend-up']"
                style="color: #5ddf95"
              />
              <p style="color: #5ddf95; margin-left: 5px">7.2%</p>
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
        <div class="mid-elements">
          <div style="font-weight: 700; font-size: 16px; margin-left: 0.7rem">
            On-time payment month by month (rooms)
          </div>
          <table class="payment-months">
            <tr>
              <th style="width: 15%; padding-left: 0.7rem">No.</th>
              <th style="width: 20%">Month</th>
              <th
                style="
                  width: 20%;
                  display: flex;
                  align-items: center;
                  position: relative;
                "
              >
                Rooms
                <p
                  style="color: red; position: absolute; top: 0; right: -2.4rem"
                >
                  *
                </p>
              </th>
              <th style="width: 20%">On-time</th>
              <th style="width: 25%">Rate</th>
            </tr>
            <tr v-for="(items, index) in tenantByMonths" :key="index">
              <td style="padding-left: 0.7rem">{{ index + 1 }}</td>
              <td>{{ items.month }}</td>
              <td>{{ items.tenants }}</td>
              <td></td>
              <td>{{ formatPercentage(items.tenants) }}</td>
            </tr>
          </table>
          <div
            style="
              display: flex;
              justify-content: space-between;
              width: 95%;
              margin: 7px 0 0 10px;
            "
          >
            <div style="font-size: 12px; font-style: italic; font-weight: 600">
              Total: 50 rooms
            </div>
            <div
              style="
                font-weight: 600;
                font-style: italic;
                font-size: 11px;
                display: flex;
              "
            >
              <div style="color: red">*</div>
              Rooms = Occupied + Reserved
            </div>
          </div>
        </div>
      </div>
      <div class="mid2">
        <div
          style="
            font-size: 22px;
            font-weight: 400;
            color: rgba(30, 27, 57, 1);
            margin-left: 1rem;
            margin-bottom: 2rem;
          "
        >
          On - time payment month by month (%)
        </div>
        <div class="chart">
          <Line :options="chartOptions" :data="chartData" style="width: 92%" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div style="margin: 0.5rem 0 0 1.8rem; font-size: 14px">
        Number of tenants in this month
      </div>
      <div class="listTable">
        <div class="table1">
          <table>
            <tr>
              <th style="width: 4rem">No.</th>
              <th style="width: 7.8rem">Room No</th>
              <th style="width: 9rem">
                <div style="display: flex; flex-direction: column">
                  Maximum
                  <span
                    style="
                      font-family: Roboto;
                      font-size: 10px;
                      font-weight: 500;

                      text-align: left;
                    "
                    >(Tenants)</span
                  >
                </div>
              </th>
              <th style="width: 9rem">
                <div style="display: flex; flex-direction: column">
                  Last month
                  <span
                    style="
                      font-family: Roboto;
                      font-size: 10px;
                      font-weight: 500;

                      text-align: left;
                    "
                    >(Tenants)</span
                  >
                </div>
              </th>
              <th style="width: 9rem">
                <div style="display: flex; flex-direction: column">
                  This month
                  <span
                    style="
                      font-family: Roboto;
                      font-size: 10px;
                      font-weight: 500;

                      text-align: left;
                    "
                    >(Tenants)</span
                  >
                </div>
              </th>
            </tr>
            <template v-if="checkData">
              <tr v-for="index in range" :key="index">
                <td colspan="5">
                  <div
                    style="
                      box-shadow: 0px 1px 13px 0px rgba(0, 0, 0, 0.08);
                      display: flex;
                      margin-left: -5px;
                      height: 2rem;
                      align-items: center;
                    "
                  >
                    <div
                      v-if="index > roomTenantList.length"
                      style="height: 40px; width: 4rem; margin-left: 5px"
                    ></div>
                    <div v-else style="width: 4rem; margin-left: 5px">
                      {{ index }}
                    </div>
                    <div style="width: 5rem">
                      {{ roomTenantList[index - 1]?.roomId }}
                    </div>
                    <div style="width: 7rem">
                      {{ roomTenantList[index - 1]?.maxTenant }}
                    </div>
                    <div style="width: 7rem">
                      {{ roomTenantList[index - 1]?.numberOfTenantLastMonth }}
                    </div>
                    <div style="width: 7rem">
                      {{ roomTenantList[index - 1]?.numberOfTenantThisMonth }}
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="index in 3" :key="index">
                <td v-if="index == 2" colspan="5" style="text-align: center">
                  No data available
                </td>
                <td v-else style="height: 40px"></td>
              </tr>
            </template>
          </table>
        </div>
        <div
          style="
            width: 1px;
            height: 9.5rem;
            background: rgba(176, 180, 205, 1);
            margin-top: 0px;
          "
        ></div>
        <div class="table2">
          <table>
            <tr>
              <th style="width: 4rem">No.</th>
              <th style="width: 7.8rem">Room No</th>
              <th style="width: 9rem">
                <div style="display: flex; flex-direction: column">
                  Maximum
                  <span
                    style="
                      font-family: Roboto;
                      font-size: 10px;
                      font-weight: 500;

                      text-align: left;
                    "
                    >(Tenants)</span
                  >
                </div>
              </th>
              <th style="width: 9rem">
                <div style="display: flex; flex-direction: column">
                  Last month
                  <span
                    style="
                      font-family: Roboto;
                      font-size: 10px;
                      font-weight: 500;

                      text-align: left;
                    "
                    >(Tenants)</span
                  >
                </div>
              </th>
              <th style="width: 9rem">
                <div style="display: flex; flex-direction: column">
                  This month
                  <span
                    style="
                      font-family: Roboto;
                      font-size: 10px;
                      font-weight: 500;

                      text-align: left;
                    "
                    >(Tenants)</span
                  >
                </div>
              </th>
            </tr>
            <template v-if="checkData && start <= 48">
              <tr v-for="index in range" :key="index">
                <td colspan="5">
                  <div
                    style="
                      box-shadow: 0px 1px 13px 0px rgba(0, 0, 0, 0.08);
                      display: flex;
                      margin-left: -5px;
                      height: 2rem;
                      align-items: center;
                    "
                  >
                    <div
                      v-if="index + 3 > roomTenantList.length"
                      style="height: 40px; width: 4rem; margin-left: 5px"
                    ></div>
                    <div v-else style="width: 4rem; margin-left: 5px">
                      {{ index + 3 }}
                    </div>
                    <div style="width: 5rem">
                      {{ roomTenantList[index + 2]?.roomId }}
                    </div>
                    <div style="width: 7rem">
                      {{ roomTenantList[index + 2]?.maxTenant }}
                    </div>
                    <div style="width: 7rem">
                      {{ roomTenantList[index + 2]?.numberOfTenantLastMonth }}
                    </div>
                    <div style="width: 7rem">
                      {{ roomTenantList[index + 2]?.numberOfTenantThisMonth }}
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="index in 3" :key="index">
                <td v-if="index == 2" colspan="5" style="text-align: center">
                  No data available
                </td>
                <td v-else style="height: 40px"></td>
              </tr>
            </template>
          </table>
        </div>
      </div>
      <div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin: 0.5rem 5rem 0 1.8rem;
          "
        >
          <div
            style="
              display: flex;
              font-size: 14px;
              color: rgba(155, 155, 155, 1);
            "
          >
            Showing&nbsp;
            <div style="font-weight: bold; color: rgba(0, 2, 49, 1)">
              {{ start }} to {{ start + 5 > 50 ? 50 : start + 5 }} of 50
            </div>
            &nbsp;entries
          </div>
          <div style="display: flex">
            (
            <div
              class="indexPage"
              v-for="index in displayedPages"
              :key="index"
              :style="{
                color:
                  clickedIndex === index
                    ? 'rgba(0, 2, 49, 1)'
                    : 'rgba(155, 155, 155, 1)',
                marginLeft: '0.5rem',
                textDecoration: clickedIndex === index ? 'underline' : 'none',
                cursor: typeof index === 'number' ? 'pointer' : 'context-menu',
              }"
              @click="roomListPagination(index)"
            >
              {{ index }}
            </div>
            <div style="margin-left: 0.5rem">)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import reportService from "@/services/reportService";
import tenantService from "@/services/tenantService";

import { Line } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,

  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler
);
const chartData = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  datasets: [
    {
      label: "On-time",
      borderColor: "#5CC8BE",
      backgroundColor: "#5CC8BE",

      borderWidth: 2,
      data: [50, 40, 45, 60, 45, 55, 50, 55, 60, 56, 80, 95],

      tension: 0.3,
      pointRadius: 0,
    },
    {
      label: "Overdue",
      borderColor: "blue",
      backgroundColor: "blue",
      borderWidth: 2,
      data: [10, 20, 35, 20, 15, 25, 10, 15, 20, 16, 20, 25],

      tension: 0.3,
      pointRadius: 0,
    },
  ],
};
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    filler: {
      propagate: false,
    },
    title: {
      display: false, // Xóa title phía trên biểu đồ
    },
    legend: {
      display: true,
      align: "end",
      labels: {
        padding: 10,

        font: {
          size: 12,
          style: "bold",
        },

        color: "#000",
        usePointStyle: true,
        pointStyle: "rect",
      },
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Ẩn lưới tọa độ trục X
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 20,
      },
    },
  },
};
interface tenantsEachMonth {
  month: number;
  tenants: number;
}
const checkdata = ref(false);
const tenantByMonths = ref<tenantsEachMonth[]>([]);
reportService.getTenantByMonths().then((res) => {
  tenantByMonths.value = res;
});
function formatPercentage(tenant: number) {
  const percent = (tenant / 120) * 100;
  return percent % 1 === 0 ? percent.toFixed(0) : percent.toFixed(1);
}
const paymentRate = ref(0);
tenantService.getTenantCount().then((res) => {
  paymentRate.value = res;
});

interface roomTenantItem {
  roomId: number;
  maxTenant: number;
  numberOfTenantLastMonth: number;
  numberOfTenantThisMonth: number;
}
const roomTenantList = ref<roomTenantItem[]>([]);
const checkData = ref(false);

//số trang lớn nhất có thể hiển thị
const maxPage = ref(9);
const clickedIndex = ref(1);

//thực hiện phân trang
const roomListPagination = (index: any) => {
  if (typeof index === "number") {
    start.value = (index - 1) * 6 + 1;
    clickedIndex.value = index;
  } else {
    console.error("Index is not a number");
  }
};
// tính toán các trang cần hiển thị
const displayedPages = computed(() => {
  const total = maxPage.value;
  const current = clickedIndex.value;
  const delta = 1; // số lượng trang hiển thị trước và sau trang hiện tại
  const range = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  if (current - delta > 2) {
    range.unshift("...");
  }
  if (current + delta < total - 1) {
    range.push("...");
  }

  range.unshift(1);
  if (total > 1) {
    range.push(total);
  }

  return range;
});

//tạo array để hiển thị các item theo index trong bảng roomListTable
const start = ref(1);
const range = computed(() => {
  const rangeArray = [];
  for (let i = start.value; i <= start.value + 2; i++) {
    if (i > roomTenantList.value.length) break;
    rangeArray.push(i);
  }
  return rangeArray;
});
reportService.getRoomTenantThisMonth(8).then((res) => {
  for (let i = 0; i < res.length; i++) {
    const item: roomTenantItem = {
      roomId: res[i].roomId,
      maxTenant: res[i].maxTenant,
      numberOfTenantLastMonth: res[i].numberOfTenantLastMonth,
      numberOfTenantThisMonth: res[i].numberOfTenantThisMonth,
    };
    roomTenantList.value.push(item);
  }

  checkData.value = true;
  maxPage.value = 9;
  console.log(roomTenantList);
});
</script>

<style scoped>
.paymentView {
  display: flex;
  flex-direction: column;
  background: rgba(245, 246, 248, 1);
  width: 90%;
  height: 97%;
  padding: 5px 20px 10px 20px;
  border-radius: 12px;
}

.header {
  width: 100%;
  position: relative;
}
.title {
  display: flex;
  height: 2.5rem;
}
.header select {
  position: absolute;
  bottom: -1rem;
  right: 0;
  width: 119px;
  height: 37px;
  border-radius: 12px;
}
.header select:disabled {
  background: #dddddd;
}
.mid {
  margin-left: 2.5rem;
  margin-right: 2.5rem;

  display: flex;

  justify-content: space-between;
}
.top-elements {
  width: 100%;
  height: 5rem;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 0px 25px 0px 25px;
}
.top-title {
  color: #6d6d6d;
  font-size: 16px;
}
.mid-elements {
  width: 100%;
  margin-top: 0.5rem;
  background: white;
  border-radius: 12px;
}
.mid1 {
  width: 33%;
}
.mid2 {
  background: white;
  border-radius: 12px;
  width: 64%;
  margin-top: 2rem;
}
.chart {
  display: flex;
  justify-content: center;

  width: 100%;
  height: 80%;
}
.payment-months {
  width: 100%;
}
.payment-months th {
  font-size: 15px;
  font-weight: 600;
}
.payment-months tr {
  border-bottom: 0.5px solid rgba(176, 180, 205, 0.344);
}
.payment-months td {
  font-size: 14px;
}
.bottom {
  display: flex;
  flex-direction: column;
  background: white;
  flex-grow: 1;
  margin: 1rem 2.5rem 0 2.5rem;

  border-radius: 12px;

  padding: 0px 30px 10px 30px;
}
.listTable {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px 0 30px;
}

.table1,
.table2 {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  height: 11rem;
}
.table1 {
  padding-right: 4rem;
}
.table2 {
  padding-left: 4rem;
}

.listTable th {
  background: none;
  color: rgba(155, 155, 155, 1);
  font-family: Roboto;
  font-size: 12px;
  font-weight: 600;
  line-height: 16.41px;
  letter-spacing: 0.01em;
  text-align: left;
  border: none;
}
.listTable td {
  border: none;
}
.indexPage:hover {
  cursor: pointer;
}
</style>

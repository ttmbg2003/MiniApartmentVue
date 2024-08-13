<template>
  <div class="tenantView">
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
          Tenant Details
        </div>
      </div>
      <select @change="getDataFromBE" v-model="month">
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </div>
    <div class="mid">
      <div class="mid1">
        <div class="top-elements">
          <div>
            <div class="top-title" style="margin-top: 1rem">Total Tenants</div>

            <div
              style="
                display: flex;
                align-items: baseline;
                font-weight: 500;
                font-size: 20px;
              "
            >
              <div style="font-weight: 700; font-size: 24px">
                {{ totalTenants }}
              </div>
              /120
            </div>

            <div
              v-if="rateDiff > 0"
              style="display: flex; align-items: baseline"
            >
              <font-awesome-icon
                :icon="['fas', 'arrow-trend-up']"
                style="color: #5ddf95"
              />
              <p style="color: #5ddf95; margin-left: 5px">{{ rateDiff }}%</p>
            </div>
            <div v-else-if="rateDiff == 0" style="height: 2.5rem"></div>
            <div v-else style="display: flex; align-items: baseline">
              <font-awesome-icon
                :icon="['fas', 'arrow-trend-down']"
                style="color: #ff0000"
              />
              <p style="color: #ff0000; margin-left: 5px">{{ -rateDiff }}%</p>
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
        <div class="mid-elements">
          <div style="font-weight: 700; font-size: 16px; margin-left: 0.7rem">
            Tenant Changes month by month
          </div>
          <table class="tenant-months">
            <tr>
              <th style="width: 20%; padding-left: 0.7rem">No.</th>
              <th style="width: 30%">Month</th>
              <th style="width: 30%">Tenants</th>
              <th style="width: 20%">Rate (%)</th>
            </tr>
            <tr v-for="(items, index) in tenantByMonths" :key="index">
              <td style="padding-left: 0.7rem">{{ index + 1 }}</td>
              <td>{{ items.month }}</td>
              <td>{{ items.tenants }}</td>
              <td>{{ formatPercentage(items.tenants) }}</td>
            </tr>
          </table>
          <div
            style="
              font-size: 12px;
              font-style: italic;
              font-weight: 600;
              margin: 7px 0 0 10px;
            "
          >
            Maximum: 120 tenants
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
          Tenant Changes month by month (%)
        </div>
        <div class="chart">
          <Line
            v-if="checkdata"
            :options="chartOptions"
            :data="chartData"
            style="width: 92%"
          />
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
              <th style="width: 7rem">
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
              <th style="width: 6rem">
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
              <th style="width: 5rem">
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
                <td v-if="index - 1 < roomTenantList.length" colspan="5">
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
                    <div style="width: 7.8rem">
                      {{ roomTenantList[index - 1]?.roomId }}
                    </div>
                    <div style="width: 7rem">
                      {{ roomTenantList[index - 1]?.maxTenant }}
                    </div>
                    <div style="width: 6rem">
                      {{ roomTenantList[index - 1]?.numberOfTenantLastMonth }}
                    </div>
                    <div style="width: 5rem">
                      {{ roomTenantList[index - 1]?.numberOfTenantThisMonth }}
                    </div>
                  </div>
                </td>
                <td v-else colspan="5" style="height: 3.1rem"></td>
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
              <th style="width: 7rem">
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
              <th style="width: 6rem">
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
              <th style="width: 5rem">
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
                    <div style="width: 7.8rem">
                      {{ roomTenantList[index + 2]?.roomId }}
                    </div>
                    <div style="width: 7rem">
                      {{ roomTenantList[index + 2]?.maxTenant }}
                    </div>
                    <div style="width: 6rem">
                      {{ roomTenantList[index + 2]?.numberOfTenantLastMonth }}
                    </div>
                    <div style="width: 5rem">
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
          <div style="display: flex; font-size: small">
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

import gradient from "chartjs-plugin-gradient";
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
interface tenantsEachMonth {
  month: number;
  tenants: number;
}
const checkdata = ref(false);
const tenantByMonths = ref<tenantsEachMonth[]>([]);
reportService.getTenantByMonths().then((res) => {
  tenantByMonths.value = res;
  chartData.value.datasets[0].data = res.map((item: tenantsEachMonth) =>
    parseFloat(formatPercentage(item.tenants))
  );
  checkdata.value = true;
  console.log(chartData.value.datasets[0].data);

  rateByMonth.value = res.map((item: tenantsEachMonth) =>
    parseFloat(formatPercentage(item.tenants))
  );
});
function formatPercentage(tenant: number) {
  const percent = (tenant / 120) * 100;
  return percent % 1 === 0 ? percent.toFixed(0) : percent.toFixed(1);
}
const totalTenants = ref(0);
const currentDate = new Date();
reportService.getTotaltenant(currentDate.getMonth() + 1).then((res) => {
  totalTenants.value = res;
});

ChartJS.register(
  Title,
  Tooltip,
  Legend,

  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  gradient
);
const chartData = ref({
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  datasets: [
    {
      label: "null",
      borderColor: "rgba(64,138,253,255)",
      gradient: {
        backgroundColor: {
          axis: "y",
          colors: {
            0: "white",
            100: "rgba(64,138,253,0.2)",
          },
        },
      },
      borderWidth: 2,
      data: [50, 40, 45, 60, 45, 55, 50, 55, 60, 56, 80, 95],
      fill: true,
      tension: 0.3,
      pointRadius: 0,
    },
  ],
});
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    gradient,
    filler: {
      propagate: false,
    },
    title: {
      display: false, // Xóa title phía trên biểu đồ
    },
    legend: {
      display: false, // Xóa legend (chú giải) của biểu đồ
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
      max: 100,
      ticks: {
        stepSize: 20,
      },
    },
  },
};

interface roomTenantItem {
  roomId: number;
  maxTenant: number;
  numberOfTenantLastMonth: number;
  numberOfTenantThisMonth: number;
}
const roomTenantList = ref<roomTenantItem[]>([]);
const checkData = ref(false);

const rateByMonth = ref([]);
const rateDiff = ref(0);

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
    rangeArray.push(i);
  }
  return rangeArray;
});
const month = ref(1);
const getDataFromBE = () => {
  reportService.getRoomTenantThisMonth(month.value).then((res) => {
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

    //change rate difference
    rateDiff.value =
      rateByMonth.value[month.value - 1] -
      (month.value - 2 == -1 ? 0 : rateByMonth.value[month.value - 2]);
  });
};
getDataFromBE();
</script>

<style scoped>
.tenantView {
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
  padding-left: 1rem;
  position: absolute;
  bottom: -1rem;
  right: 0;
  width: 119px;
  height: 37px;
  border-radius: 12px;
  border: none;
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
.tenant-months {
  width: 100%;
}
.tenant-months th {
  font-size: 15px;
  font-weight: 600;
}
.tenant-months tr {
  border-bottom: 0.5px solid rgba(176, 180, 205, 0.344);
}
.tenant-months td {
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

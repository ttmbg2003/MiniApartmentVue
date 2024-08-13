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
            <div class="top-title" style="margin-top: 1rem">
              On-time payment Rate
            </div>

            <div style="font-weight: 700; font-size: 24px">
              {{ paymentRate }}%
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
            <img src="/src/components/icons/ontimeRate.png" />
          </div>
        </div>
        <div class="mid-elements">
          <div style="font-weight: 700; font-size: 16px; margin-left: 0.7rem">
            On-time payment month by month (rooms)
          </div>
          <table v-if="checkdata" class="payment-months">
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
            <tr v-for="(items, index) in rateList" :key="index">
              <td style="padding-left: 0.7rem">{{ index + 1 }}</td>
              <td>{{ items.month }}</td>
              <td>{{ items.rooms }}</td>
              <td>{{ items.onTimeRooms }}</td>
              <td>{{ formatPercentage(items.rooms, items.onTimeRooms) }}</td>
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
          <Line
            v-if="checkloadedChart"
            :options="chartOptions"
            :data="chartData"
            style="width: 90%"
          />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="filter">
        <img
          style="width: 56px; height: 15px; margin-right: 10px"
          src="/src/components/icons/filter.png"
        />
        <el-checkbox-group v-model="statusFilter" size="small">
          <el-checkbox label="On-time" value="on-time" border />
          <el-checkbox label="Overdue" value="overdue" border />
        </el-checkbox-group>
      </div>
      <div class="listTable">
        <div class="table1">
          <table>
            <tr>
              <th style="width: 3rem">No.</th>
              <th style="width: 5rem">Room No</th>

              <th style="width: 5rem">
                <div style="display: flex">
                  Fee
                  <span
                    style="
                      font-family: Roboto;
                      font-size: 10px;
                      font-weight: 500;

                      text-align: left;
                    "
                    >(VND)
                  </span>
                </div>
              </th>
              <th style="width: 6.5rem">Due Date</th>
              <th style="width: 7rem">Payment Date</th>
              <th style="width: 5rem">Status</th>
            </tr>
            <template v-if="checkData && listToDisplay.length > 0">
              <tr v-for="index in range" :key="index">
                <td v-if="listToDisplay[index] != null" colspan="6">
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
                      v-if="index > listToDisplay.length"
                      style="height: 40px; width: 4rem; margin-left: 5px"
                    ></div>
                    <div v-else style="width: 3rem; margin-left: 5px">
                      {{ index }}
                    </div>
                    <div style="width: 5rem">
                      {{ listToDisplay[index - 1]?.roomId }}
                    </div>
                    <div style="width: 5rem">
                      {{ listToDisplay[index - 1]?.totalFee }}
                    </div>
                    <div style="width: 6.5rem">
                      {{ listToDisplay[index - 1]?.dueDate }}
                    </div>
                    <div style="width: 7rem">
                      {{ listToDisplay[index - 1]?.paymentDate }}
                    </div>
                    <div
                      v-if="listToDisplay[index - 1]?.status == 'overdue'"
                      style="width: 5rem"
                    >
                      <img
                        style="width: 3.75rem; height: auto"
                        src="/src/components/icons/overdue.png"
                      />
                    </div>
                    <div
                      v-else-if="listToDisplay[index - 1]?.status === 'on-time'"
                    >
                      <img
                        style="width: 3.75rem; height: auto"
                        src="/src/components/icons/ontime.png"
                      />
                    </div>
                    <div v-else></div>
                  </div>
                </td>
                <td v-else colspan="6" style="height: 3.1rem"></td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="index in 3" :key="index">
                <td v-if="index == 2" colspan="6" style="text-align: center">
                  No data available
                </td>
                <td v-else style="height: 3.1rem"></td>
              </tr>
            </template>
          </table>
        </div>
        <div
          style="
            width: 1px;
            height: 9.5rem;
            background: rgba(176, 180, 205, 1);
            margin: 0;
            margin-top: 0px;
          "
        ></div>
        <div class="table2">
          <table>
            <tr>
              <th style="width: 3rem">No.</th>
              <th style="width: 5rem">Room No</th>

              <th style="width: 5rem">
                <div style="display: flex">
                  Fee
                  <span
                    style="
                      font-family: Roboto;
                      font-size: 10px;
                      font-weight: 500;

                      text-align: left;
                    "
                    >(VND)
                  </span>
                </div>
              </th>
              <th style="width: 6.5rem">Due Date</th>
              <th style="width: 7rem">Payment Date</th>
              <th style="width: 5rem">Status</th>
            </tr>
            <template
              v-if="checkData && checkDisplayTable2 && listToDisplay.length > 0"
            >
              <tr v-for="index in range" :key="index">
                <td v-if="listToDisplay[index + 2] != null" colspan="6">
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
                      v-if="index + 3 > listToDisplay.length"
                      style="height: 40px; width: 3rem; margin-left: 5px"
                    ></div>
                    <div v-else style="width: 3rem; margin-left: 5px">
                      {{ index + 3 }}
                    </div>
                    <div style="width: 5rem">
                      {{ listToDisplay[index + 2]?.roomId }}
                    </div>
                    <div style="width: 5rem">
                      {{ listToDisplay[index + 2]?.totalFee }}
                    </div>
                    <div style="width: 6.5rem">
                      {{ listToDisplay[index + 2]?.dueDate }}
                    </div>
                    <div style="width: 7rem">
                      {{ listToDisplay[index + 2]?.paymentDate }}
                    </div>
                    <div v-if="index - 1 >= listToDisplay.length"></div>
                    <div
                      v-else-if="listToDisplay[index - 1]?.status == 'overdue'"
                      style="width: 5rem"
                    >
                      <img
                        style="width: 3.75rem; height: auto"
                        src="/src/components/icons/overdue.png"
                      />
                    </div>
                    <div
                      v-else-if="listToDisplay[index - 1]?.status == 'on-time'"
                    >
                      <img
                        style="width: 3.75rem; height: auto"
                        src="/src/components/icons/ontime.png"
                      />
                    </div>
                  </div>
                </td>
                <td v-else colspan="6" style="height: 3.1rem"></td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="index in 3" :key="index">
                <td v-if="index == 2" colspan="6" style="text-align: center">
                  No data available
                </td>
                <td v-else style="height: 3.1rem"></td>
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
              {{ start }} to
              {{
                start + 5 > listToDisplay.length
                  ? listToDisplay.length
                  : start + 5
              }}
              of {{ listToDisplay.length }}
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
import { watch, ref, computed } from "vue";
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
const checkloadedChart = ref(false);
const chartData = ref({
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  datasets: [
    {
      label: "Overdue",
      borderColor: "blue",
      backgroundColor: "blue",
      borderWidth: 2,
      data: [10, 20, 35, 20, 15, 25, 10, 15, 20, 16, 20, 25],

      tension: 0.3,
      pointRadius: 0,
    },
    {
      label: "On-time",
      borderColor: "#5CC8BE",
      backgroundColor: "#5CC8BE",

      borderWidth: 2,
      data: [50, 40, 45, 60, 45, 55, 50, 55, 60, 56, 80, 95],

      tension: 0.3,
      pointRadius: 0,
    },
  ],
});
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
      max: 100,
      ticks: {
        stepSize: 20,
      },
    },
  },
};
interface onTimePaymentRate {
  month: number;
  rooms: number;
  onTimeRooms: number;
}
const checkdata = ref(false);
const rateList = ref<onTimePaymentRate[]>([]);
reportService.getOntimePaymentMonths().then((res) => {
  //sort theo month sau đó đưa vào list
  rateList.value = res.sort(
    (a: onTimePaymentRate, b: onTimePaymentRate) => a.month - b.month
  );
  chartData.value.datasets[1].data = res.map((item: onTimePaymentRate) =>
    parseFloat(formatPercentage(item.rooms, item.onTimeRooms))
  );
  chartData.value.datasets[0].data = res.map((item: onTimePaymentRate) =>
    parseFloat(formatPercentage(item.rooms, item.rooms - item.onTimeRooms))
  );
  checkloadedChart.value = true;
  console.log(rateList.value);
  checkdata.value = true;

  rateByMonth.value = res.map((item: onTimePaymentRate) =>
    parseFloat(formatPercentage(item.rooms, item.onTimeRooms))
  );
});
function formatPercentage(room: number, onTimeRoom: number) {
  const percent = (onTimeRoom / room) * 100;
  return percent % 1 === 0 ? percent.toFixed(0) : percent.toFixed(1);
}
const paymentRate = ref(0);
const rateByMonth = ref([]);
const rateDiff = ref(0);

interface StatusPaymentItem {
  roomId: number;
  totalFee: number;
  dueDate: string;
  paymentDate: string;
  status: string;
}
const statusFilter = ref(["on-time"]);
const month = ref(1);

const statusPaymentList = ref<StatusPaymentItem[]>([]);
const listToDisplay = ref<StatusPaymentItem[]>([]);
const checkData = ref(false);

//số trang lớn nhất có thể hiển thị
const maxPage = ref(9);
const clickedIndex = ref(1);
const checkDisplayTable2 = ref(false);
const displayTable2 = () => {
  if (range.value[0] + 3 > listToDisplay.value.length) {
    checkDisplayTable2.value = false;
  } else checkDisplayTable2.value = true;
};
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
const start = ref(0);
const range = computed(() => {
  const rangeArray = [];
  for (let i = start.value; i <= start.value + 2; i++) {
    if (i > listToDisplay.value.length) break;
    rangeArray.push(i);
  }
  return rangeArray;
});
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};
const filterRoomList = () => {
  listToDisplay.value = []; // Clear the table before pushing new items
  for (let i = 0; i < statusPaymentList.value.length; i++) {
    const item = statusPaymentList.value[i];
    if (statusFilter.value.includes(item.status)) {
      listToDisplay.value.push(item);
    }
  }
  clickedIndex.value = 1;
  start.value = listToDisplay.value.length > 0 ? 1 : 0;
  maxPage.value = Math.min(Math.ceil(listToDisplay.value.length / 6), 9);
};
const getDataFromBE = () => {
  reportService.getPaymentStatusRoom(month.value).then((res) => {
    statusPaymentList.value = [];
    for (let i = 0; i < res.length; i++) {
      const item: StatusPaymentItem = {
        roomId: res[i].roomId,
        totalFee: res[i].totalFee,
        dueDate: formatDate(new Date(res[i].dueDate)),
        paymentDate: formatDate(new Date(res[i].paymentDate)),
        status: res[i].status,
      };
      statusPaymentList.value.push(item);
    }

    checkData.value = true;
    maxPage.value = 9;
    console.log(statusPaymentList);
    filterRoomList();

    //update on-time rate in top title
    paymentRate.value = rateByMonth.value[month.value - 1];
    rateDiff.value =
      rateByMonth.value[month.value - 1] -
      (month.value - 2 == -1 ? 0 : rateByMonth.value[month.value - 2]);
  });
};
getDataFromBE();
watch([listToDisplay, range], displayTable2);
watch(statusFilter, filterRoomList);
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
.top-icon-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 22px;
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
.filter {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 0.3rem;
  padding-bottom: 5px;

  border-bottom: 1px solid rgba(176, 180, 205, 1);
}
.el-checkbox {
  width: 87px;
  height: 27px;
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
  margin-right: 2rem;
}
.table2 {
  margin-left: 2rem;
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

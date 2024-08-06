<template>
  <div class="roomView">
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
          Room Status Details
        </div>
      </div>
      <select disabled>
        <option value="0">August</option>
        <option value="1">September</option>
        <option value="2">October</option>
        <option value="3">November</option>
      </select>
    </div>
    <div class="mid" style="max-height: fit-content">
      <div id="mid1" style="width: 20rem">
        <div class="midItems">
          <div>
            <p>Total Rooms</p>
            <div
              style="
                font-weight: 700;
                font-size: 28px;
                color: rgba(32, 34, 36, 1);
              "
            >
              {{ total }}
            </div>
          </div>
          <img src="/src/components/icons/orangeHomeIcon.png" />
        </div>
        <div class="midItems" style="padding-top: 0px; padding-bottom: 0px">
          <div>
            <p>Occupied Rooms</p>
            <div
              style="
                margin-top: -10px;
                font-weight: 700;
                font-size: 20px;
                color: rgba(32, 34, 36, 1);
              "
            >
              {{ occupied }}
            </div>
          </div>
          <img src="/src/components/icons/purpleHomeIcon.png" />
        </div>
        <div class="midItems" style="padding-top: 0px; padding-bottom: 0px">
          <div>
            <p>Vacant Rooms</p>
            <div
              style="
                margin-top: -10px;
                font-weight: 700;
                font-size: 20px;
                color: rgba(32, 34, 36, 1);
              "
            >
              {{ vacant }}
            </div>
          </div>
          <img src="/src/components/icons/greenHomeIcon.png" />
        </div>
        <div class="midItems" style="padding-top: 0px; padding-bottom: 0px">
          <div>
            <p>Reserved Rooms</p>
            <div
              style="
                margin-top: -10px;
                font-weight: 700;
                font-size: 20px;
                color: rgba(32, 34, 36, 1);
              "
            >
              {{ reserved }}
            </div>
          </div>
          <img src="/src/components/icons/blueHomeIcon.png" />
        </div>
      </div>
      <div id="mid2" style="width: 25rem; margin-top: 1.8rem">
        <div class="midItems" style="flex-direction: column">
          <div style="width: 100%">
            <div
              style="
                font-weight: 700;
                font-size: 16px;
                padding-top: 10px;
                margin-bottom: 30px;
              "
            >
              Room Status
            </div>
          </div>

          <table style="width: 100%">
            <tr>
              <th>No.</th>
              <th>Status</th>
              <th>Rooms</th>
              <th>Rate (%)</th>
            </tr>
            <tr v-for="(items, index) in roomStatusTable" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ items.status }}</td>
              <td>{{ items.room }}</td>
              <td>{{ items.rate }}</td>
            </tr>
          </table>
          <div style="width: 100%; margin-top: 10px; margin-bottom: 10px">
            <div style="font-weight: 600; font-style: italic; font-size: 12px">
              Total: {{ total }} rooms
            </div>
          </div>
        </div>
      </div>
      <div id="mid3" style="width: 26rem; margin-top: 1.8rem">
        <div class="midItems" style="padding-top: 14px; padding-bottom: 14px">
          <RoomChartView />
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
          <el-checkbox label="Occupied" value="occupied" border />
          <el-checkbox label="Vacant" value="vacant" border />
          <el-checkbox label="Reserved" value="reserved" border />
        </el-checkbox-group>
      </div>
      <div class="listTable">
        <div class="table1">
          <table>
            <tr>
              <th style="width: 4rem">No.</th>
              <th style="width: 7.8rem">Room No</th>
              <th style="width: 12.3rem">
                Rental Fee
                <span
                  style="
                    font-family: Roboto;
                    font-size: 11px;
                    font-weight: 500;

                    letter-spacing: 0.01em;
                    text-align: left;
                  "
                  >(VND)</span
                >
              </th>
              <th style="width: 7.9rem">Status</th>
            </tr>
            <template v-if="checkData && roomListTable.length > 0">
              <tr v-for="index in range" :key="index">
                <td
                  v-if="index > roomListTable.length"
                  style="height: 40px"
                ></td>
                <td v-else>{{ index }}</td>
                <td>{{ roomListTable[index - 1]?.roomNo }}</td>
                <td>{{ roomListTable[index - 1]?.fee }}</td>
                <td v-if="roomListTable[index - 1]?.status === 'occupied'">
                  <img
                    style="width: 3.75rem; height: auto"
                    src="/src/components/icons/occupied.png"
                  />
                </td>
                <td v-else-if="roomListTable[index - 1]?.status === 'reserved'">
                  <img
                    style="width: 3.75rem; height: auto"
                    src="/src/components/icons/reserved.png"
                  />
                </td>
                <td v-else-if="roomListTable[index - 1]?.status === 'vacant'">
                  <img
                    style="width: 3.75rem; height: auto"
                    src="/src/components/icons/vacant.png"
                  />
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="index in 5" :key="index">
                <td v-if="index == 3" colspan="5" style="text-align: center">
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
            height: 12.5rem;
            background: rgba(176, 180, 205, 1);
          "
        ></div>
        <div class="table2">
          <table>
            <tr>
              <th style="width: 4rem">No.</th>
              <th style="width: 7.8rem">Room No</th>
              <th style="width: 12.3rem">
                Rental Fee
                <span
                  style="
                    font-family: Roboto;
                    font-size: 11px;
                    font-weight: 500;

                    letter-spacing: 0.01em;
                    text-align: left;
                  "
                  >(VND)</span
                >
              </th>
              <th style="width: 7.9rem">Status</th>
            </tr>
            <template v-if="checkData && roomListTable.length >= 6">
              <tr v-for="index in range" :key="index">
                <td
                  v-if="index + 5 > roomListTable.length"
                  style="height: 40px"
                ></td>
                <td v-else>{{ index + 5 }}</td>
                <td>{{ roomListTable[index + 4]?.roomNo }}</td>
                <td>{{ roomListTable[index + 4]?.fee }}</td>
                <td v-if="roomListTable[index + 4]?.status === 'occupied'">
                  <img
                    style="width: 3.75rem; height: auto"
                    src="/src/components/icons/occupied.png"
                  />
                </td>
                <td v-else-if="roomListTable[index + 4]?.status === 'reserved'">
                  <img
                    style="width: 3.75rem; height: auto"
                    src="/src/components/icons/reserved.png"
                  />
                </td>
                <td v-else-if="roomListTable[index + 4]?.status === 'vacant'">
                  <img
                    style="width: 3.75rem; height: auto"
                    src="/src/components/icons/vacant.png"
                  />
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="index in 5" :key="index">
                <td v-if="index == 3" colspan="4" style="text-align: center">
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
            margin: 1rem 5rem 0 1.8rem;
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
              {{ start }} to {{ start + 9 }} of 50
            </div>
            &nbsp;entries
          </div>
          <div style="display: flex">
            (
            <div
              class="indexPage"
              v-for="index in maxPage"
              :key="index"
              :style="{
                color:
                  clickedIndex === index
                    ? 'rgba(0, 2, 49, 1)'
                    : 'rgba(155, 155, 155, 1)',
                marginLeft: '0.5rem',
                textDecoration: clickedIndex === index ? 'underline' : 'none',
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
import RoomChartView from "../RoomChartView.vue";
import { ref, watch, onMounted, computed } from "vue";
import reportService from "@/services/reportService";
const occupied = ref(0);
const vacant = ref(0);
const reserved = ref(0);
const total = 50;

onMounted(() => {
  reportService.getRoomByStatus().then((res) => {
    occupied.value = res.occupiedCount;
    vacant.value = res.vacantCount;
    reserved.value = res.reservedCount;
    roomStatusTable.value[0].rate = (occupied.value / total) * 100;
    roomStatusTable.value[1].rate = (vacant.value / total) * 100;
    roomStatusTable.value[2].rate = (reserved.value / total) * 100;
  });
});
const roomStatusTable = ref([
  { status: "Occupied", room: occupied, rate: (occupied.value / total) * 100 },
  { status: "vacant", room: vacant, rate: (vacant.value / total) * 100 },
  { status: "Reserved", room: reserved, rate: (reserved.value / total) * 100 },
]);

interface roomDetailItem {
  roomNo: number;
  fee: string;
  status: string;
}
const statusFilter = ref(["occupied"]);
const roomDetailList = ref<roomDetailItem[]>([]);

const roomListTable = ref<roomDetailItem[]>([]);
const filterRoomList = () => {
  roomListTable.value = []; // Clear the table before pushing new items
  for (let i = 0; i < roomDetailList.value.length; i++) {
    const item = roomDetailList.value[i];
    if (statusFilter.value.includes(item.status)) {
      roomListTable.value.push(item);
    }
  }
  maxPage.value = Math.min(Math.ceil(roomListTable.value.length / 10), 5);
};

//số trang lớn nhất có thể hiển thị
const maxPage = ref(1);
const clickedIndex = ref(1);

//thực hiện phân trang
const roomListPagination = (index: number) => {
  console.log(index);
  start.value = (index - 1) * 10 + 1;
  clickedIndex.value = index;
};

//tạo array để hiển thị các item theo index trong bảng roomListTable
const start = ref(1);
const range = computed(() => {
  const rangeArray = [];
  for (let i = start.value; i <= start.value + 4; i++) {
    rangeArray.push(i);
  }
  return rangeArray;
});

reportService.getRoomDetailList().then((res) => {
  for (let i = 0; i < res.length; i++) {
    const item: roomDetailItem = {
      roomNo: res[i].roomId,
      fee: res[i].rentalFee,
      status: res[i].roomStatus,
    };
    roomDetailList.value.push(item);
  }
  filterRoomList();
  checkData.value = true;
  console.log(roomListTable);
});

const checkData = ref(false);
// Watch for changes in statusFilter
watch(statusFilter, filterRoomList);

// Run the filter function when the component is first mounted
onMounted(filterRoomList);
</script>

<style scoped>
.roomView {
  display: flex;
  flex-direction: column;
  background: rgba(245, 246, 248, 1);
  width: 90%;
  height: 95%;
  padding: 5px 20px 10px 20px;
  border-radius: 12px;
}
.header {
  width: 100%;
  position: relative;
}
.title {
  display: flex;
  height: 4rem;
}
.header select {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 119px;
  height: 37px;
  border-radius: 12px;
}
.header select:disabled {
  background: #dddddd;
}
.mid {
  display: flex;

  padding-left: 2rem;

  justify-content: space-between;
}
.midItems {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: white;
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 10px;
}
.midItems p {
  font-weight: 600;
  font-size: 16px;
  color: rgb(90, 89, 89);
}

#mid2 th,
td {
  border-bottom: 0.5px solid rgba(176, 180, 205, 1);
}
.bottom {
  display: flex;
  flex-direction: column;
  background: white;
  flex-grow: 1;
  margin-left: 30px;
  border-radius: 12px;

  padding: 10px 30px 10px 30px;
}
.filter {
  display: flex;
  align-items: center;
  width: 100%;
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
  height: 15rem;
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
  font-size: 14px;
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

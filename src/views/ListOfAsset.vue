<template>
  <div
    style="display: flex; height: 100%; width: 100%; background-color: #f5f6f8"
  >
    <SideBar class="sidebar" />
    <div class="main-screen">
      <div style="display: flex; align-items: center">
        <div style="width: 0.19rem; height: 2.56rem; background: #0064ff"></div>
        <div style="font-size: 26px; font-weight: 600; margin-left: 0.5rem">
          List of Assets
        </div>
      </div>
      <div class="setTime">
        <div style="float: left; display: flex; flex-direction: column">
          <label
            >Year
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="10"
              height="10"
              viewBox="0 0 256 256"
              xml:space="preserve"
              style="float: right; margin: 0.5rem 0 0 0.4rem"
            >
              <defs></defs>
              <g
                style="
                  stroke: none;
                  stroke-width: 0;
                  stroke-dasharray: none;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-miterlimit: 10;
                  fill: none;
                  fill-rule: nonzero;
                  opacity: 1;
                "
                transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
              >
                <path
                  d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
                  style="
                    stroke: none;
                    stroke-width: 1;
                    stroke-dasharray: none;
                    stroke-linecap: butt;
                    stroke-linejoin: miter;
                    stroke-miterlimit: 10;
                    fill: rgb(0, 0, 0);
                    fill-rule: nonzero;
                    opacity: 1;
                  "
                  transform=" matrix(1 0 0 1 0 0) "
                  stroke-linecap="round"
                />
              </g>
            </svg>
          </label>
          <VueDatePicker
            :model-value="year"
            year-picker
            :year-range="[2020, 2040]"
            :clearable="false"
            placeholder="Select year"
            @update:model-value="updateYear"
          >
            <template #input-icon> </template>
            <template #dp-input="{ value }">
              <input
                type="text"
                :value="value"
                readonly
                style="
                  cursor: pointer;
                  height: 1.5rem;
                  width: 4rem;
                  text-align: center;
                  border: 1px solid #0000002e;
                  border-radius: 0.4rem;
                  outline: none;
                  background-color: #e0dede66;
                "
              />
            </template>
          </VueDatePicker>
        </div>
        <div style="margin-left: 30px">
          <label
            >Month
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="10"
              height="10"
              viewBox="0 0 256 256"
              xml:space="preserve"
              style="float: right; margin: 0.5rem 0 0 0.4rem"
            >
              <defs></defs>
              <g
                style="
                  stroke: none;
                  stroke-width: 0;
                  stroke-dasharray: none;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-miterlimit: 10;
                  fill: none;
                  fill-rule: nonzero;
                  opacity: 1;
                "
                transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
              >
                <path
                  d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
                  style="
                    stroke: none;
                    stroke-width: 1;
                    stroke-dasharray: none;
                    stroke-linecap: butt;
                    stroke-linejoin: miter;
                    stroke-miterlimit: 10;
                    fill: rgb(0, 0, 0);
                    fill-rule: nonzero;
                    opacity: 1;
                  "
                  transform=" matrix(1 0 0 1 0 0) "
                  stroke-linecap="round"
                />
              </g>
            </svg> </label
          ><br />
          <select
            v-model="month"
            style="
              cursor: pointer;
              height: 1.5rem;
              width: 4rem;
              text-align: center;
              border: 1px solid #0000002e;
              border-radius: 0.4rem;
              outline: none;
              background-color: #e0dede66;
              appearance: none;
            "
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </select>
        </div>
      </div>
      <div class="listTable">
        <div class="table1">
          <div class="search">
            <form class="form">
              <button>
                <svg
                  width="17"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-labelledby="search"
                >
                  <path
                    d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                    stroke="currentColor"
                    stroke-width="1.333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </button>
              <input
                class="input"
                placeholder="Please enter room no"
                required
                type="text"
              />
              <button class="reset" type="reset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
          <table style="margin-top: 1rem">
            <tr style="width: 100%">
              <th style="width: 3rem">No.</th>
              <th style="width: 5rem">Room No</th>
              <th style="width: 5rem">Quantity</th>
              <th style="width: 8rem">
                <div style="display: flex; align-items: baseline">
                  Total value&nbsp;
                  <span
                    style="
                      font-family: Roboto;
                      font-size: 10px;
                      font-weight: 500;

                      text-align: left;
                    "
                    >(VND)</span
                  >
                </div>
              </th>
              <th style="width: 3rem">hehe</th>
            </tr>
            <template v-if="checkData">
              <tr v-for="index in range" :key="index">
                <td colspan="5">
                  <div
                    style="
                      box-shadow: 0px 1px 13px 0px #00000014;

                      display: flex;
                      margin-left: -5px;
                      height: 2rem;
                      align-items: center;
                      margin-top: 0.6rem;
                    "
                  >
                    <div
                      v-if="index > assetRoomList.length"
                      style="height: 40px; width: 3rem; margin-left: 5px"
                    ></div>
                    <div v-else style="width: 3rem; margin-left: 5px">
                      {{ index }}
                    </div>
                    <div style="width: 5rem">
                      {{ assetRoomList[index - 1]?.roomId }}
                    </div>
                    <div style="width: 5rem">
                      {{ assetRoomList[index - 1]?.quantity }}
                    </div>
                    <div style="width: 8rem">
                      {{ formatNumber(assetRoomList[index - 1]?.totalValue) }}
                    </div>
                    <div
                      style="
                        width: 3rem;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      <svg
                        class="iconBtn"
                        width="20"
                        height="16"
                        viewBox="0 0 14 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        @click="getAssetDetailEachRoom(index)"
                      >
                        <path
                          d="M1.66666 5C1.66666 5 3.66666 1 7.16666 1C10.6667 1 12.6667 5 12.6667 5C12.6667 5 10.6667 9 7.16666 9C3.66666 9 1.66666 5 1.66666 5Z"
                          :stroke="
                            clickedRoom === index ? '#0000ff' : '#000231'
                          "
                          stroke-opacity="0.65"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.16666 6.5C7.99508 6.5 8.66666 5.82843 8.66666 5C8.66666 4.17157 7.99508 3.5 7.16666 3.5C6.33823 3.5 5.66666 4.17157 5.66666 5C5.66666 5.82843 6.33823 6.5 7.16666 6.5Z"
                          :stroke="
                            clickedRoom === index ? '#0000ff' : '#000231'
                          "
                          stroke-opacity="0.65"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="index in 10" :key="index">
                <td v-if="index == 6" colspan="5" style="text-align: center">
                  No data available
                </td>
                <td v-else style="height: 40px"></td>
              </tr>
            </template>
          </table>
          <div
            v-if="checkData"
            style="
              display: flex;
              justify-content: space-between;

              margin-top: 0.6rem;
              width: 100%;
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
                  start + 9 < assetRoomList.length
                    ? start + 9
                    : assetRoomList.length
                }}
                of {{ assetRoomList.length }}
              </div>
              &nbsp;entries
            </div>
            <div style="display: flex">
              (
              <div
                class="indexPage"
                v-for="index in 5"
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
        <div class="table2">
          <div
            v-if="getAssetData"
            style="
              width: 100%;
              height: 100%;
              margin-left: 0.5rem;
              position: relative;
            "
          >
            <div class="top">
              <div
                style="
                  font-size: 15px;
                  font-weight: 600;
                  color: #0565f9;
                  margin-top: 0.3rem;
                  margin-left: 1rem;
                "
              >
                View Detail of Room
                {{ assetRoomList.at(clickedRoom - 1)?.roomId }}
              </div>
              <button class="addBtn">
                <svg
                  class="addBtnSvg"
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.25 9C2.25 8.11358 2.42459 7.23583 2.76381 6.41689C3.10303 5.59794 3.60023 4.85382 4.22703 4.22703C4.85382 3.60023 5.59794 3.10303 6.41689 2.76381C7.23583 2.42459 8.11358 2.25 9 2.25C9.88642 2.25 10.7642 2.42459 11.5831 2.76381C12.4021 3.10303 13.1462 3.60023 13.773 4.22703C14.3998 4.85382 14.897 5.59794 15.2362 6.41689C15.5754 7.23583 15.75 8.11358 15.75 9C15.75 10.7902 15.0388 12.5071 13.773 13.773C12.5071 15.0388 10.7902 15.75 9 15.75C7.20979 15.75 5.4929 15.0388 4.22703 13.773C2.96116 12.5071 2.25 10.7902 2.25 9ZM9 0.75C4.44375 0.75 0.75 4.44375 0.75 9C0.75 13.5562 4.44375 17.25 9 17.25C13.5562 17.25 17.25 13.5562 17.25 9C17.25 4.44375 13.5562 0.75 9 0.75ZM9.75 5.25C9.75 5.05109 9.67098 4.86032 9.53033 4.71967C9.38968 4.57902 9.19891 4.5 9 4.5C8.80109 4.5 8.61032 4.57902 8.46967 4.71967C8.32902 4.86032 8.25 5.05109 8.25 5.25V8.25H5.25C5.05109 8.25 4.86032 8.32902 4.71967 8.46967C4.57902 8.61032 4.5 8.80109 4.5 9C4.5 9.19891 4.57902 9.38968 4.71967 9.53033C4.86032 9.67098 5.05109 9.75 5.25 9.75H8.25V12.75C8.25 12.9489 8.32902 13.1397 8.46967 13.2803C8.61032 13.421 8.80109 13.5 9 13.5C9.19891 13.5 9.38968 13.421 9.53033 13.2803C9.67098 13.1397 9.75 12.9489 9.75 12.75V9.75H12.75C12.9489 9.75 13.1397 9.67098 13.2803 9.53033C13.421 9.38968 13.5 9.19891 13.5 9C13.5 8.80109 13.421 8.61032 13.2803 8.46967C13.1397 8.32902 12.9489 8.25 12.75 8.25H9.75V5.25Z"
                    fill="white"
                  />
                </svg>
                <div
                  style="
                    color: white;
                    font-size: 12px;
                    font-weight: 700;
                    margin-left: 0.2rem;
                  "
                >
                  Add new
                </div>
              </button>
            </div>

            <table style="margin-top: 1rem">
              <tr style="width: 100%">
                <th style="width: 2rem">No.</th>
                <th style="width: 5.7rem">Item</th>
                <th style="width: 3rem">Unit</th>
                <th style="width: 4.5rem">Quantity</th>
                <th style="width: 5rem">
                  <div style="display: flex; align-items: baseline">
                    Value&nbsp;
                    <span
                      style="
                        font-family: Roboto;
                        font-size: 10px;
                        font-weight: 500;

                        text-align: left;
                      "
                      >(VND)</span
                    >
                  </div>
                </th>
                <th style="width: 7rem">
                  Maintainance<br />
                  cycle
                </th>
                <th style="width: 7rem">
                  Maintainance<br />
                  Date
                </th>
                <th style="width: 7rem">
                  Maintainance<br />
                  Status
                </th>
                <th style="width: 4rem">hehe</th>
              </tr>
              <template v-if="checkAssetData">
                <tr v-for="index in assetRange" :key="index">
                  <td colspan="9">
                    <div
                      style="
                        box-shadow: 0px 1px 13px 0px #00000014;

                        display: flex;
                        margin-left: -5px;
                        height: 2rem;
                        align-items: center;
                        margin-top: 0.6rem;
                        width: 100%;
                      "
                    >
                      <div
                        v-if="index > assetDetailList.length"
                        style="height: 40px; width: 2rem; margin-left: 5px"
                      ></div>
                      <div v-else style="width: 2rem; margin-left: 5px">
                        {{ index }}
                      </div>
                      <div style="width: 5.7rem">
                        {{ assetDetailList[index - 1]?.item }}
                      </div>
                      <div style="width: 3rem">
                        {{ assetDetailList[index - 1]?.unit }}
                      </div>
                      <div style="width: 4.5rem">
                        {{ assetDetailList[index - 1]?.quantity }}
                      </div>
                      <div style="width: 5rem">
                        {{ formatNumber(assetDetailList[index - 1].value) }}
                      </div>
                      <div style="width: 7rem">
                        {{ assetDetailList[index - 1]?.maintCycle }} months
                      </div>
                      <div style="width: 7rem">
                        {{ assetDetailList[index - 1]?.maintDate }}
                      </div>
                      <div style="width: 7rem">
                        {{ assetDetailList[index - 1]?.maintStatus }}
                      </div>
                      <div
                        style="
                          width: 4rem;
                          display: flex;
                          justify-content: center;
                        "
                      >
                        <svg
                          class="iconBtn"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.48132 12.4999H1.32945C1.19013 12.4999 1.05651 12.4472 0.957998 12.3535C0.859483 12.2597 0.804138 12.1325 0.804138 11.9999V9.20703C0.804138 9.14137 0.817726 9.07635 0.844125 9.01569C0.870524 8.95503 0.909219 8.89991 0.957999 8.85348L8.83767 1.35348C8.93618 1.25971 9.0698 1.20703 9.20912 1.20703C9.34844 1.20703 9.48205 1.25971 9.58057 1.35348L12.5148 4.14637C12.6134 4.24014 12.6687 4.36732 12.6687 4.49992C12.6687 4.63253 12.6134 4.75971 12.5148 4.85348L4.48132 12.4999Z"
                            :stroke="
                              clickedRoom === index ? '#0000ff' : '#000231'
                            "
                            stroke-opacity="0.65"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <svg
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.2217 3.5L2.66483 3.5"
                            stroke="#000231"
                            stroke-opacity="0.65"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.86731 6.5V10.5"
                            stroke="#000231"
                            stroke-opacity="0.65"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10.0192 6.5V10.5"
                            stroke="#000231"
                            stroke-opacity="0.65"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13.1711 3.5V13C13.1711 13.1326 13.1157 13.2598 13.0172 13.3536C12.9187 13.4473 12.7851 13.5 12.6457 13.5H4.24077C4.10144 13.5 3.96783 13.4473 3.86931 13.3536C3.7708 13.2598 3.71545 13.1326 3.71545 13V3.5"
                            stroke="#000231"
                            stroke-opacity="0.65"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.0698 3.5V2.5C11.0698 2.23478 10.9591 1.98043 10.7621 1.79289C10.565 1.60536 10.2978 1.5 10.0192 1.5H6.8673C6.58866 1.5 6.32143 1.60536 6.1244 1.79289C5.92737 1.98043 5.81668 2.23478 5.81668 2.5V3.5"
                            stroke="#000231"
                            stroke-opacity="0.65"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="index in 10" :key="index">
                  <td v-if="index == 6" colspan="8" style="text-align: center">
                    No data available
                  </td>
                  <td v-else style="height: 40px"></td>
                </tr>
              </template>
            </table>
            <div
              v-if="checkAssetData"
              style="
                display: flex;
                justify-content: space-between;
                position: absolute;
                bottom: 0.4rem;
                margin-top: 0.6rem;

                width: 98%;
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
                  {{ assetRange[0] }} to
                  {{
                    assetRange[0] + 9 < assetDetailList.length
                      ? assetRange[0] + 9
                      : assetDetailList.length
                  }}
                  of {{ assetDetailList.length }}
                </div>
                &nbsp;entries
              </div>
              <div style="display: flex">
                (
                <div
                  class="indexPage"
                  v-for="index in 5"
                  :key="index"
                  :style="{
                    color:
                      clickedIndex === index
                        ? 'rgba(0, 2, 49, 1)'
                        : 'rgba(155, 155, 155, 1)',
                    marginLeft: '0.5rem',
                    textDecoration:
                      clickedIndex === index ? 'underline' : 'none',
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import SideBar from "@/components/SideBar.vue";
import { ref, watch, computed } from "vue";
import AssetService from "@/services/assetService";
const year = ref(new Date().getFullYear());
const month = ref();
function updateYear(newYear: number) {
  year.value = newYear;
}
interface assetRoomItem {
  roomId: number;
  quantity: number;
  totalValue: number;
}
const checkData = ref(false);
const assetRoomList = ref<assetRoomItem[]>([]);
const getRoomFromBE = () => {
  AssetService.getRoomByTime(month.value, year.value).then((res) => {
    assetRoomList.value = [];
    assetRoomList.value = res;
    checkData.value = true;
    clickedRoom.value = -1;
  });
};

function formatNumber(value: number | undefined): string {
  if (value === undefined) return "";
  return value.toLocaleString("vi-VN");
}

//tạo array để hiển thị các item theo index trong bảng
const start = ref(1);
const range = computed(() => {
  const rangeArray = [];
  for (let i = start.value; i <= start.value + 9; i++) {
    rangeArray.push(i);
  }
  return rangeArray;
});

const clickedIndex = ref(1);

//thực hiện phân trang
const roomListPagination = (index: number) => {
  console.log(index);
  start.value = (index - 1) * 10 + 1;
  clickedIndex.value = index;
};
watch([year, month], getRoomFromBE);

const clickedRoom = ref<number>(-1);

const getAssetData = ref(false);
interface assetDetailItem {
  id: number;
  item: string;
  unit: string;
  quantity: number;
  value: number;
  maintCycle: number;
  maintDate: string;
  maintStatus: string;
}
const maxPage = ref(1);
const assetRange = ref<number[]>([]);
function updateAssetRange(totalElements: number) {
  assetRange.value = Array.from({ length: totalElements }, (_, i) => i + 1);
  console.log(assetRange.value);
}

const checkAssetData = ref(false);
const assetDetailList = ref<assetDetailItem[]>([]);
const getAssetDetailEachRoom = (index: number) => {
  getAssetData.value = true;
  clickedRoom.value = index;
  const roomId = assetRoomList.value[index - 1].roomId;
  assetDetailList.value = [];
  AssetService.getAssetDetailEachRoom(roomId, month.value, year.value).then(
    (res) => {
      checkAssetData.value = true;
      assetDetailList.value = res.content;
      maxPage.value = res.totalPages;
      updateAssetRange(res.totalElements);
      console.log(res.totalElements);
      console.log(assetRange.value);

      console.log(assetDetailList.value);
    }
  );
};
</script>

<style scoped>
.sidebar {
  width: 18%;
}
.main-screen {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  margin: 1.5rem 1.5rem 0 1.5rem;
  background: white;
  box-shadow: 0px 4px 5px 0px #0000001f;
  padding: 0.5rem;
}
.setTime {
  display: flex;
  margin-left: 1rem;
}
.listTable {
  margin-top: 1rem;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
}
.table1,
.table2 {
  box-shadow: 0px 1px 5px 0px #0000001f;
  height: 100%;
}
.table1 {
  width: 35%;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
}
.table2 {
  width: 64%;
}

.search {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
}
.form button {
  border: none;
  background: none;
  color: #8b8ba7;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* styling of whole input container */
.form {
  --timing: 0.3s;
  --width-of-input: 14rem;
  --height-of-input: 2rem;
  --border-height: 2px;
  --input-bg: #f9f7f7;
  --border-color: #2f2ee9;
  --border-radius: 30px;
  --after-border-radius: 1px;
  position: relative;
  width: var(--width-of-input);
  height: var(--height-of-input);
  display: flex;
  align-items: center;

  border-radius: var(--border-radius);
  transition: border-radius 0.5s ease;
  background: var(--input-bg, #fff);
}
/* styling of Input */
.input {
  font-size: 0.9rem;
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}
/* styling of animated border */
.form:before {
  content: "";
  position: absolute;
  background: var(--border-color);
  transform: scaleX(0);
  transform-origin: center;
  width: 100%;
  height: var(--border-height);
  left: 0;
  bottom: 0;
  border-radius: 1px;
  transition: transform var(--timing) ease;
}
/* Hover on Input */
.form:focus-within {
  border-radius: var(--after-border-radius);
}

input:focus {
  outline: none;
}
/* here is code of animated border */
.form:focus-within:before {
  transform: scale(1);
}
/* styling of close button */
/* == you can click the close button to remove text == */
.reset {
  border: none;
  background: none;
  opacity: 0;
}
/* close button shown when typing */
input:not(:placeholder-shown) ~ .reset {
  opacity: 1;
  visibility: visible;
}
/* sizing svg icons */
.form svg {
  width: 1rem;
}
.listTable th {
  background: none;
  color: #9b9b9b;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.41px;
  letter-spacing: 0.01em;
  text-align: left;
  border: none;
}
.listTable td {
  border: none;
}
.iconBtn {
  transition: color 0.3s;
}

.iconBtn:hover {
  cursor: pointer;
}
.top {
  width: 100%;
  justify-content: space-between;
  display: flex;
}
.addBtn {
  background: #0565f9;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.1rem;
  height: 1.5rem;
  border: none;
  border-radius: 8px;
  margin-right: 1rem;
  margin-top: 0.7rem;
  transition: background 0.3s, transform 0.1s;
}

.addBtn:active {
  background: #034ab8;
  transform: scale(0.95);
}
.addBtnSvg {
  transition: transform 1s;
}

.addBtn:hover .addBtnSvg {
  transform: rotate(180deg);
}
</style>

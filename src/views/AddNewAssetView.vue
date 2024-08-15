<template>
  <div class="modal-content" style="">
    <div class="modal-header">
      <h1
        class="modal-title fs-5"
        style="color: rgba(5, 101, 249, 1)"
        id="exampleModalLabel"
      >
        Add new asset - Room 101
      </h1>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div class="modal-body">
      <table style="margin-top: 1rem; width: 99%">
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
                  position: relative;
                  display: flex;
                  margin-left: -5px;
                  height: 2rem;
                  align-items: center;
                  margin-top: 0.6rem;
                  width: 100%;
                "
              >
                <div
                  v-if="clickedAssetItem === index"
                  style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 90%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    pointer-events: none;
                    z-index: 1;
                  "
                ></div>
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
                <div style="width: 4.8rem">
                  {{ assetDetailList[index - 1]?.quantity }}
                </div>
                <div style="width: 5rem">
                  {{ formatNumber(assetDetailList[index - 1].value) }}
                </div>
                <div v-if="clickedAssetItem !== index" style="width: 7rem">
                  {{ addZero(assetDetailList[index - 1]?.maintCycle) }}
                  months
                </div>
                <div style="width: 7rem" v-else>
                  <select
                    style="border: none; margin-left: -0.25rem"
                    v-model="assetDetailList[index - 1].maintCycle"
                    @change="updateMaintCycle()"
                  >
                    <option :value="1">01 month</option>
                    <option :value="3">03 months</option>
                    <option :value="6">06 months</option>
                    <option :value="9">09 months</option>
                    <option :value="12">12 months</option>
                  </select>
                </div>

                <div v-if="clickedAssetItem !== index" style="width: 7rem">
                  {{ assetDetailList[index - 1]?.maintDate }}
                </div>
                <div v-else>
                  <VueDatePicker
                    style="
                      width: 7rem;
                      display: flex;
                      align-items: center;
                      cursor: pointer;
                    "
                    v-model="date"
                    range
                    :format="format"
                    @update:model-value="handleDate"
                    ><template #trigger>
                      <div
                        style="width: 7rem; display: flex; align-items: center"
                      >
                        {{ assetDetailList[index - 1]?.maintDate }}
                        <img
                          style="margin-left: 0.3rem"
                          src="@/components/icons/calendar.png"
                        />
                      </div>
                    </template>
                  </VueDatePicker>
                </div>

                <div v-if="clickedAssetItem == index" class="custom-select">
                  <button @click="toggleDropdown()" class="select-button">
                    <div v-if="selectedMaintStatus == 'Done'">
                      <img
                        style="width: 3.8rem; height: 1.2rem"
                        src="@/components/icons/doneAsset.png"
                      />
                    </div>
                    <div v-else-if="selectedMaintStatus == 'Overdue'">
                      <img
                        style="width: 3.8rem; height: 1.2rem"
                        src="@/components/icons/overdueAsset.png"
                      />
                    </div>
                    <div v-else-if="selectedMaintStatus == 'Pending'">
                      <img
                        style="width: 3.8rem; height: 1.2rem"
                        src="@/components/icons/pendingAsset.png"
                      />
                    </div>
                    <div v-else-if="selectedMaintStatus == 'Scheduled'">
                      <img
                        style="width: 3.8rem; height: 1.2rem"
                        src="@/components/icons/scheduledAsset.png"
                      />
                    </div>
                    <div v-else>
                      <img
                        style="width: 3.8rem; height: 1.2rem"
                        src="@/components/icons/progressAsset.png"
                      />
                    </div>
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style="margin-left: 0.5rem"
                    >
                      <path
                        d="M11.0324 1.1574C10.9626 1.0871 10.8797 1.0313 10.7883 0.993227C10.6969 0.95515 10.5989 0.935547 10.4999 0.935547C10.4009 0.935547 10.3028 0.95515 10.2114 0.993227C10.12 1.0313 10.0371 1.0871 9.96736 1.1574L6.53236 4.59239C6.46264 4.66268 6.37969 4.71848 6.28829 4.75656C6.1969 4.79463 6.09887 4.81424 5.99986 4.81424C5.90085 4.81424 5.80282 4.79463 5.71143 4.75656C5.62004 4.71848 5.53708 4.66268 5.46736 4.59239L2.03236 1.1574C1.96264 1.0871 1.87969 1.0313 1.78829 0.993227C1.6969 0.95515 1.59887 0.935547 1.49986 0.935547C1.40085 0.935547 1.30282 0.95515 1.21143 0.993227C1.12003 1.0313 1.03708 1.0871 0.967362 1.1574C0.827674 1.29792 0.749268 1.48801 0.749268 1.68614C0.749268 1.88428 0.827674 2.07437 0.967362 2.21489L4.40986 5.65739C4.83174 6.07874 5.40361 6.31541 5.99986 6.31541C6.59611 6.31541 7.16799 6.07874 7.58986 5.65739L11.0324 2.21489C11.1721 2.07437 11.2505 1.88428 11.2505 1.68614C11.2505 1.48801 11.1721 1.29792 11.0324 1.1574Z"
                        fill="#292D32"
                      />
                    </svg>
                  </button>
                  <div v-if="dropdownOpen" class="dropdown">
                    <div
                      v-for="option in options"
                      :key="option"
                      :class="[
                        'option',
                        { selected: option === selectedMaintStatus },
                      ]"
                      @click="selectOption(option)"
                    >
                      <div v-if="option == 'Done'">
                        <img
                          style="width: 3.8rem; height: 1.2rem"
                          src="@/components/icons/doneAsset.png"
                        />
                      </div>
                      <div v-else-if="option == 'Overdue'">
                        <img
                          style="width: 3.8rem; height: 1.2rem"
                          src="@/components/icons/overdueAsset.png"
                        />
                      </div>
                      <div v-else-if="option == 'Pending'">
                        <img
                          style="width: 3.8rem; height: 1.2rem"
                          src="@/components/icons/pendingAsset.png"
                        />
                      </div>
                      <div v-else-if="option == 'Scheduled'">
                        <img
                          style="width: 3.8rem; height: 1.2rem"
                          src="@/components/icons/scheduledAsset.png"
                        />
                      </div>
                      <div v-else>
                        <img
                          style="width: 3.8rem; height: 1.2rem"
                          src="@/components/icons/progressAsset.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else>
                  <div
                    v-if="assetDetailList[index - 1]?.maintStatus == 'Done'"
                    style="width: 7rem; display: flex; align-items: center"
                  >
                    <img
                      style="width: 3.8rem; height: 1.2rem"
                      src="@/components/icons/doneAsset.png"
                    />
                  </div>
                  <div
                    v-else-if="
                      assetDetailList[index - 1]?.maintStatus == 'Overdue'
                    "
                    style="width: 7rem; display: flex; align-items: center"
                  >
                    <img
                      style="width: 3.8rem; height: 1.2rem"
                      src="@/components/icons/overdueAsset.png"
                    />
                  </div>
                  <div
                    v-else-if="
                      assetDetailList[index - 1]?.maintStatus == 'Pending'
                    "
                    style="width: 7rem; display: flex; align-items: center"
                  >
                    <img
                      style="width: 3.8rem; height: 1.2rem"
                      src="@/components/icons/pendingAsset.png"
                    />
                  </div>
                  <div
                    v-else-if="
                      assetDetailList[index - 1]?.maintStatus == 'Scheduled'
                    "
                    style="width: 7rem; display: flex; align-items: center"
                  >
                    <img
                      style="width: 3.8rem; height: 1.2rem"
                      src="@/components/icons/scheduledAsset.png"
                    />
                  </div>
                  <div
                    v-else
                    style="width: 7rem; display: flex; align-items: center"
                  >
                    <img
                      style="width: 3.8rem; height: 1.2rem"
                      src="@/components/icons/progressAsset.png"
                    />
                  </div>
                </div>

                <!-- this is icon button -->
                <div
                  style="width: 4rem; display: flex; justify-content: center"
                >
                  <svg
                    class="iconBtn"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    @click="updateAssetItem(index)"
                  >
                    <path
                      d="M4.48132 12.4999H1.32945C1.19013 12.4999 1.05651 12.4472 0.957998 12.3535C0.859483 12.2597 0.804138 12.1325 0.804138 11.9999V9.20703C0.804138 9.14137 0.817726 9.07635 0.844125 9.01569C0.870524 8.95503 0.909219 8.89991 0.957999 8.85348L8.83767 1.35348C8.93618 1.25971 9.0698 1.20703 9.20912 1.20703C9.34844 1.20703 9.48205 1.25971 9.58057 1.35348L12.5148 4.14637C12.6134 4.24014 12.6687 4.36732 12.6687 4.49992C12.6687 4.63253 12.6134 4.75971 12.5148 4.85348L4.48132 12.4999Z"
                      :stroke="
                        clickedAssetItem === index ? '#0000ff' : '#000231'
                      "
                      stroke-opacity="0.65"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg
                    class="iconBtn"
                    style="margin-left: 0.5rem"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    @click="deleteItem(index)"
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
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
      </button>
      <button type="button" class="btn btn-primary">Save changes</button>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>

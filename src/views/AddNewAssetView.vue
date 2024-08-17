<template>
  <div class="modal-content" style="">
    <div class="modal-header" style="position: relative; border: none">
      <h1
        class="modal-title fs-5"
        style="color: rgba(5, 101, 249, 1)"
        id="exampleModalLabel"
      >
        Add new asset - Room {{ roomId }}
      </h1>
      <svg
        class="addBtnSvg"
        width="20"
        height="20"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="createAssetDetailItem()"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.25 9C2.25 8.11358 2.42459 7.23583 2.76381 6.41689C3.10303 5.59794 3.60023 4.85382 4.22703 4.22703C4.85382 3.60023 5.59794 3.10303 6.41689 2.76381C7.23583 2.42459 8.11358 2.25 9 2.25C9.88642 2.25 10.7642 2.42459 11.5831 2.76381C12.4021 3.10303 13.1462 3.60023 13.773 4.22703C14.3998 4.85382 14.897 5.59794 15.2362 6.41689C15.5754 7.23583 15.75 8.11358 15.75 9C15.75 10.7902 15.0388 12.5071 13.773 13.773C12.5071 15.0388 10.7902 15.75 9 15.75C7.20979 15.75 5.4929 15.0388 4.22703 13.773C2.96116 12.5071 2.25 10.7902 2.25 9ZM9 0.75C4.44375 0.75 0.75 4.44375 0.75 9C0.75 13.5562 4.44375 17.25 9 17.25C13.5562 17.25 17.25 13.5562 17.25 9C17.25 4.44375 13.5562 0.75 9 0.75ZM9.75 5.25C9.75 5.05109 9.67098 4.86032 9.53033 4.71967C9.38968 4.57902 9.19891 4.5 9 4.5C8.80109 4.5 8.61032 4.57902 8.46967 4.71967C8.32902 4.86032 8.25 5.05109 8.25 5.25V8.25H5.25C5.05109 8.25 4.86032 8.32902 4.71967 8.46967C4.57902 8.61032 4.5 8.80109 4.5 9C4.5 9.19891 4.57902 9.38968 4.71967 9.53033C4.86032 9.67098 5.05109 9.75 5.25 9.75H8.25V12.75C8.25 12.9489 8.32902 13.1397 8.46967 13.2803C8.61032 13.421 8.80109 13.5 9 13.5C9.19891 13.5 9.38968 13.421 9.53033 13.2803C9.67098 13.1397 9.75 12.9489 9.75 12.75V9.75H12.75C12.9489 9.75 13.1397 9.67098 13.2803 9.53033C13.421 9.38968 13.5 9.19891 13.5 9C13.5 8.80109 13.421 8.61032 13.2803 8.46967C13.1397 8.32902 12.9489 8.25 12.75 8.25H9.75V5.25Z"
          fill="rgba(5, 101, 249, 1)"
        />
      </svg>
    </div>
    <div class="modal-body" style="width: 100%">
      <table style="margin-top: 1rem; width: 100%">
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
          <th style="width: 4rem"></th>
        </tr>
        <tr v-for="index in newItemList.length" :key="index">
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
                v-if="index > newItemList.length"
                style="height: 40px; width: 2rem; margin-left: 5px"
              ></div>
              <div v-else style="width: 2rem; margin-left: 5px">
                {{ index }}
              </div>
              <div
                v-if="clickedAssetItem != index"
                style="
                  width: 5.7rem;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
              >
                {{ newItemList[index - 1]?.itemName }}
              </div>
              <div v-else>
                <input
                  style="
                    width: 5.7rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                  type="text"
                  v-model="newItemList[index - 1].itemName"
                />
              </div>
              <div v-if="clickedAssetItem != index" style="width: 3rem">
                {{ newItemList[index - 1]?.unit }}
              </div>
              <div v-else>
                <input
                  style="width: 3rem"
                  type="text"
                  v-model="newItemList[index - 1].unit"
                />
              </div>
              <div v-if="clickedAssetItem != index" style="width: 4.8rem">
                {{ newItemList[index - 1]?.quantity }}
              </div>
              <div v-else>
                <input
                  style="width: 4.8rem"
                  type="number"
                  v-model="newItemList[index - 1].quantity"
                />
              </div>
              <div v-if="clickedAssetItem != index" style="width: 5rem">
                {{ formatNumber(newItemList[index - 1].value) }}
              </div>
              <div v-else>
                <input
                  style="width: 5rem"
                  type="number"
                  v-model="newItemList[index - 1].value"
                />
              </div>
              <div v-if="clickedAssetItem !== index" style="width: 7rem">
                {{ addZero(newItemList[index - 1]?.maintCycle) }}
                months
              </div>
              <div style="width: 7rem" v-else>
                <select
                  style="border: none; margin-left: -0.25rem"
                  v-model="newItemList[index - 1].maintCycle"
                >
                  <option :value="1">01 month</option>
                  <option :value="3">03 months</option>
                  <option :value="6">06 months</option>
                  <option :value="9">09 months</option>
                  <option :value="12">12 months</option>
                </select>
              </div>

              <div v-if="clickedAssetItem !== index" style="width: 7rem">
                {{ newItemList[index - 1]?.maintDate }}
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
                      {{ newItemList[index - 1]?.maintDate }}
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
                  v-if="newItemList[index - 1]?.maintStatus == 'Done'"
                  style="width: 7rem; display: flex; align-items: center"
                >
                  <img
                    style="width: 3.8rem; height: 1.2rem"
                    src="@/components/icons/doneAsset.png"
                  />
                </div>
                <div
                  v-else-if="newItemList[index - 1]?.maintStatus == 'Overdue'"
                  style="width: 7rem; display: flex; align-items: center"
                >
                  <img
                    style="width: 3.8rem; height: 1.2rem"
                    src="@/components/icons/overdueAsset.png"
                  />
                </div>
                <div
                  v-else-if="newItemList[index - 1]?.maintStatus == 'Pending'"
                  style="width: 7rem; display: flex; align-items: center"
                >
                  <img
                    style="width: 3.8rem; height: 1.2rem"
                    src="@/components/icons/pendingAsset.png"
                  />
                </div>
                <div
                  v-else-if="newItemList[index - 1]?.maintStatus == 'Scheduled'"
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
              <div style="width: 4rem; display: flex; justify-content: center">
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
                    :stroke="clickedAssetItem === index ? '#0000ff' : '#000231'"
                    stroke-opacity="0.65"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  class="iconBtn"
                  style="margin-left: 0.5rem; margin-right: 0.5rem"
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
      </table>
    </div>
    <div
      class="modal-footer"
      style="border: none; display: flex; justify-content: center"
    >
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="resetList()"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="addNewItem()"
        data-bs-dismiss="modal"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import AssetService from "@/services/assetService";
import { ref, defineEmits } from "vue";
const prop = defineProps({
  roomId: Number,
  year: Number,
  month: Number,
});
const emit = defineEmits(["result"]);
const clickedAssetItem = ref(-1);
interface assetDetailItem {
  itemName: string;
  unit: string;
  quantity: number;
  value: number;
  maintCycle: number;
  maintDate: string;
  maintStatus: string;
}

// Hàm để tạo một item implement assetDetailItem với id là index và thêm vào newItemList
const createAssetDetailItem = () => {
  const assetDetailItem: assetDetailItem = {
    itemName: "",
    unit: "",
    quantity: 0,
    value: 0,
    maintCycle: 0,
    maintDate: "",
    maintStatus: "",
  };

  // Thêm assetDetailItem vào danh sách newItemList
  newItemList.value.push(assetDetailItem);
};
const newItemList = ref<assetDetailItem[]>([]);
createAssetDetailItem();
//update properties

const isAssetItemUpdated = ref(false);
const updateAssetItem = (index: number) => {
  if (isAssetItemUpdated.value && clickedAssetItem.value === index) {
    // Reset values if clicked again
    selectedMaintStatus.value = "";
    clickedAssetItem.value = -1;
    isAssetItemUpdated.value = false;
  } else {
    // Update values
    selectedMaintStatus.value = newItemList.value[index - 1].maintStatus;
    clickedAssetItem.value = index;
    parseDateRange();
    isAssetItemUpdated.value = true;
  }
};

//update
//custom select
const dropdownOpen = ref(false);
const selectedMaintStatus = ref("Pending");
const options = ref(["Pending", "Scheduled", "In Progress", "Done", "Overdue"]);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectOption = (option: string) => {
  selectedMaintStatus.value = option;
  dropdownOpen.value = false;

  newItemList.value[clickedAssetItem.value - 1].maintStatus =
    selectedMaintStatus.value;
};

//update maintDate
const date = ref<Date[]>([]);
const format = (date: Date[]) => {
  const day1 = date[0].getDate();
  const month1 = date[0].getMonth() + 1;
  const day2 = date[1].getDate();
  const month2 = date[1].getMonth() + 1;
  return `${day1}/${month1} - ${day2}/${month2}`;
};
const handleDate = (modelData: Date[]) => {
  newItemList.value[clickedAssetItem.value - 1].maintDate = format(modelData);
};
const parseDateRange = () => {
  // Chuỗi ngày
  const dateString = newItemList.value[clickedAssetItem.value - 1].maintDate;

  // Phân tích chuỗi ngày thành hai phần
  const [start, end] = dateString.split(" - ");

  // Tạo đối tượng Date cho startDate và endDate
  const startDate = new Date(
    new Date().getFullYear(),
    parseInt(start.split("/")[1]) - 1,
    parseInt(start.split("/")[0])
  );
  const endDate = new Date(
    new Date().getFullYear(),
    parseInt(end.split("/")[1]) - 1,
    parseInt(end.split("/")[0])
  );
  // Loại bỏ giờ, phút, giây khỏi ngày
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  // Gán giá trị cho date
  date.value = [startDate, endDate];
};

//format number
function addZero(value: number | undefined): string {
  if (value === undefined || value == 0) return "";
  return value < 10 ? `0${value}` : value.toString();
}

function formatNumber(value: number | undefined): string {
  if (value === undefined) return "";
  return value.toLocaleString("vi-VN");
}
//delete item function
function deleteItem(index: number) {
  newItemList.value.splice(index, 1);
}

//reset list
const resetList = () => {
  newItemList.value = [];
  createAssetDetailItem();
};
const validateInputs = () => {
  for (const item of newItemList.value) {
    if (!item.unit || !item.quantity || !item.value) {
      return false;
    }
  }
  return true;
};
const addNewItem = () => {
  if (!validateInputs()) {
    Swal.fire("Please fill all required fields!", "", "error");
    return;
  }
  Swal.fire({
    title: "Are you sure want to add these items?",

    showCancelButton: true,
    confirmButtonText: "Confirm",
    confirmButtonColor: "rgba(5, 101, 249, 1)",
    width: "27rem",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      const item = {
        year: prop.year,
        month: prop.month,
        roomId: prop.roomId,
        asset: newItemList.value,
      };
      AssetService.addNewAssetItems(item).then((res) => {
        console.log(res);
        if (res == 200) {
          Swal.fire("Successful!", "", "success");
          emit("result", true);
        } else {
          Swal.fire("Add failed!", "", "error");
        }
      });
    }
  });
};
</script>

<style scoped>
.addBtnSvg {
  transition: transform 1s;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}

.addBtnSvg:hover {
  transform: rotate(180deg);
  cursor: pointer;
}
th {
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
td {
  border: none;
}
.custom-select {
  width: 7rem;
  position: relative;
}

.select-button {
  margin-left: -0.35rem;
  margin-top: -0.3rem;
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: fit-content;
  overflow-y: auto;
  z-index: 1;
}

.option {
  width: fit-content;
  padding: 8px 10px;
  cursor: pointer;
}

.option:hover,
.option.selected {
  background-color: #e6f7ff;
}
tr input {
  border: none;
}
</style>

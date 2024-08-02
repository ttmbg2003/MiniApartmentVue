<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div style="display: flex;height: 97%">
        <SideBar />
        <div style="
    background: #F5F6F8;
    width: 100%;
    height: 100%;
">
            <div class="container">
                <div class="card">

                    <div style="display: flex; margin-bottom: 10px">
                        <div class="line-blue"></div>
                        <div style="display: flex;align-items: center;">
                            <h3 style="margin: 0;">List of Living Expenses</h3>
                        </div>
                        <div class="d-flex justify-content-end" style="    width: 76%;">
                            <button class="btn btn-add-new" data-bs-toggle="modal" data-bs-target="#addNewExpensesModal"
                                :disabled="month == null || month == '' || month < currentMonth" @click="getRoomId"><i
                                    style="margin-right: 10px;">
                                    <img src="../components/icons/circled-plus.png"
                                        style="margin-bottom: 3px;width: 24px;"></i>Add new</button>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex;">
                            <div style="    text-align: center;">
                                <label>Year</label>
                                <VueDatePicker :model-value="year" year-picker :year-range="[2020, 2040]"
                                    :clearable="false" placeholder="Select year" @update:model-value="getListPayment">
                                    <template #input-icon>
                                    </template>
                                    <template #dp-input="{ value }">
                                        <input type="text" :value="value" readonly
                                            style="cursor: pointer;height: 38px;width: 60px;text-align: center;border: 1px solid #0000002e;border-radius: 4px;outline: none;background-color:#E0DEDE66 " />
                                    </template>
                                </VueDatePicker>
                                <!-- <VueDatePicker :model-value="month" @update:model-value="updateMonth" month-picker placeholder="Select month" style="width: 170px;" /> -->
                            </div>
                            <div style="margin-left: 30px;    text-align: center;">
                                <label>Month</label><br />
                                <select v-model="month" @change="getExpensesByMonth"
                                    :disabled="isShowExpensesDetail == true"
                                    style="cursor: pointer;height: 38px;width: 60px;text-align: center;border: 1px solid #0000002e;border-radius: 4px;outline: none;background-color:#E0DEDE66 ">
                                    <option selected></option>
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
                            <div style="margin-left: 30px;    text-align: center;">
                                <label>Room No</label><br />
                                <select v-model="selectedRoomIdByMonth" @change="selectedGetRoom"
                                    :disabled="month == null || month == '' || expensesByMonth == ''"
                                    style="cursor: pointer;height: 38px;width: 78px;text-align: center;border: 1px solid #0000002e;border-radius: 4px;outline: none;background-color:#E0DEDE66 ">
                                    <option selected></option>
                                    <option v-for="room in allRoom" :value="room.roomId">{{ room.roomId }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div style="display: flex;justify-content: flex-end;">
                            <p style="margin-right: 31px; margin-bottom: 0;">Total: {{ totalElement }}</p>
                        </div>
                        <div style="box-shadow: rgba(0, 0, 0, 0.23) 0px 0px 4px;border-radius: 5px;">
                            <div style="margin: 12px; padding-bottom: 4px">
                                <div v-if="payment == ''" style="display: flex;justify-content: center">
                                    <p style="margin: 0;margin-top: 10px;">No data to display</p>
                                </div>
                                <table
                                    v-if="(month == null || month == '') && (selectedRoomIdByMonth == null || selectedRoomIdByMonth == '')"
                                    style="width: 100%;">
                                    <thead style="color: #9B9B9B;border-bottom: solid #B0B4CD 1px;height: 45px;">
                                        <th>Room No</th>
                                        <th>Jan</th>
                                        <th>Feb</th>
                                        <th>Mar</th>
                                        <th>Apr</th>
                                        <th>May</th>
                                        <th>Jun</th>
                                        <th>Jul</th>
                                        <th>Aug</th>
                                        <th>Sep</th>
                                        <th>Oct</th>
                                        <th>Nov</th>
                                        <th>Dec</th>
                                        <th style="width: 135px;">Status</th>
                                        <th>Action</th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="payments in payment" style="height:50px;">
                                            <td>
                                                <div class="back-ground-row-table">{{ payments.roomId }}</div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">{{ payments.jan }}</div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">{{ payments.feb }}</div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">{{ payments.mar }}</div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">{{ payments.apr }}</div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">{{ payments.may }}</div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">{{ payments.jun }}</div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">{{ payments.jul }}</div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">{{ payments.aug }}</div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">{{ payments.sep }}</div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">{{ payments.oct }}</div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">{{ payments.nov }}</div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">{{ payments.dec }}</div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">
                                                    <div v-if="payments.status == 'Paid'"
                                                        class="payment-status-paid payment-status">{{
                                                            payments.status }}</div>
                                                    <div v-if="payments.status == 'Partial Paid'"
                                                        class="payment-status-partial payment-status">
                                                        {{
                                                            payments.status }}
                                                    </div>
                                                    <div v-if="payments.status == 'Unpaid'"
                                                        class="payment-status-unpaid payment-status">{{
                                                            payments.status }}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="back-ground-row-table">
                                                    <a @click="showExpensesDetail(payments.roomId)"><i><img
                                                                v-if="!isShowExpensesDetail"
                                                                src="../components/icons/eye.png" style="width: 23px;">
                                                            <img v-if="isShowExpensesDetail"
                                                                src="../components/icons/eye - Copy.png"
                                                                style="width: 23px;"></i></a>
                                                    <a href="#"><i><img src="../components/icons/TrashIcon.png"
                                                                style="width: 23px;"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div v-else-if="selectedRoomIdByMonth == null || selectedRoomIdByMonth == ''">
                                    <div v-if="expensesByMonth == ''" style="display: flex;justify-content: center">
                                        <p style="margin: 0;margin-top: 10px;">No data to display</p>
                                    </div>
                                    <table style="width: 100%;">

                                        <thead style="color: #9B9B9B;border-bottom: solid #B0B4CD 1px;height: 45px;">
                                            <th class="header-table-add-new">Room No</th>
                                            <th class="header-table-add-new">Rental Fee <br />(VND)</th>
                                            <th class="header-table-add-new">Electricity <br />
                                                (3.800vnd)</th>
                                            <th class="header-table-add-new">Water<br />
                                                (35.000vnd)</th>
                                            <th class="header-table-add-new">Internet<br />
                                                (VND)</th>
                                            <th class="header-table-add-new">Service<span
                                                    style="color: red;">*</span><br />
                                                (VND)</th>
                                            <th class="header-table-add-new">Security Deposit<br />
                                                (VND)</th>
                                            <th class="header-table-add-new">Debt<br />
                                                (VND)</th>
                                            <th class="header-table-add-new">Fine<br />
                                                (VND)</th>
                                            <th class="header-table-add-new" style="    width: 134px;">Status
                                            </th>
                                            <th class="header-table-add-new">Action</th>
                                        </thead>
                                        <tbody>
                                            <tr v-for="expenses in expensesByMonth"
                                                style="height: 50px;background-color: #9c9c9c17;">
                                                <td style="padding-left: 10px;">{{ expenses.roomId }}</td>
                                                <td>{{ fomatFee(expenses.rentalFee) }}</td>
                                                <td>{{ fomatFee((expenses.electricCurrentMeter -
                                                    expenses.electricPreviousMeter)
                                                    * 3800) }}</td>
                                                <td>{{ fomatFee((expenses.waterCurrentMeter -
                                                    expenses.waterPreviousMeter) *
                                                    35000) }}</td>
                                                <td>{{ fomatFee(expenses.internet) }}</td>
                                                <td>{{ fomatFee(expenses.service) }}</td>
                                                <td>{{ fomatFee(expenses.securityDeposite) }}</td>
                                                <td>{{ fomatFee(expenses.debt) }}</td>
                                                <td>{{ fomatFee(expenses.fine) }}</td>
                                                <td>
                                                    <div v-if="expenses.status == 'Paid'"
                                                        class="payment-status-paid payment-status">{{
                                                            expenses.status }}</div>
                                                    <div v-if="expenses.status == 'Partial Paid'"
                                                        class="payment-status-partial payment-status">
                                                        {{
                                                            expenses.status }}
                                                    </div>
                                                    <div v-if="expenses.status == 'Unpaid'"
                                                        class="payment-status-unpaid payment-status">{{
                                                            expenses.status }}</div>
                                                </td>
                                                <td>
                                                    <a><i><img v-if="!isShowExpensesDetail"
                                                                src="../components/icons/eye.png" style="width: 23px;">
                                                            <img v-if="isShowExpensesDetail"
                                                                src="../components/icons/eye - Copy.png"
                                                                style="width: 23px;"></i></a>
                                                    <a href="#" @click="deleteExpenses(expenses.roomId)"><i><img src="../components/icons/TrashIcon.png"
                                                                style="width: 23px;"></i></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-else>
                                    <div v-if="expensesByMonth == null" style="display: flex;justify-content: center">
                                        <p style="margin: 0;margin-top: 10px;">No data to display</p>
                                    </div>
                                    <table style="width: 100%;">
                                        <thead style="color: #9B9B9B;border-bottom: solid #B0B4CD 1px;height: 45px;">
                                            <th class="header-table-add-new">Room No</th>
                                            <th class="header-table-add-new">Rental Fee <br />(VND)</th>
                                            <th class="header-table-add-new">Electricity <br />
                                                (3.800vnd)</th>
                                            <th class="header-table-add-new">Water<br />
                                                (35.000vnd)</th>
                                            <th class="header-table-add-new">Internet<br />
                                                (VND)</th>
                                            <th class="header-table-add-new">Service<span
                                                    style="color: red;">*</span><br />
                                                (VND)</th>
                                            <th class="header-table-add-new">Security Deposit<br />
                                                (VND)</th>
                                            <th class="header-table-add-new">Debt<br />
                                                (VND)</th>
                                            <th class="header-table-add-new">Fine<br />
                                                (VND)</th>
                                            <th class="header-table-add-new" style="    width: 134px;">Status
                                            </th>
                                            <th class="header-table-add-new">Action</th>
                                        </thead>
                                        <tbody>
                                            <tr style="height: 50px;background-color: #9c9c9c17;">
                                                <td style="padding-left: 10px;">{{ expensesByMonthAndRoom!.roomId }}
                                                </td>
                                                <td>{{ fomatFee(expensesByMonthAndRoom!.rentalFee) }}</td>
                                                <td>{{ fomatFee((expensesByMonthAndRoom!.electricCurrentMeter -
                                                    expensesByMonthAndRoom!.electricPreviousMeter)
                                                    * 3800) }}</td>
                                                <td>{{ fomatFee((expensesByMonthAndRoom!.waterCurrentMeter -
                                                    expensesByMonthAndRoom!.waterPreviousMeter) *
                                                    35000) }}</td>
                                                <td>{{ fomatFee(expensesByMonthAndRoom?.internet) }}</td>
                                                <td>{{ fomatFee(expensesByMonthAndRoom?.service) }}</td>
                                                <td>{{ fomatFee(expensesByMonthAndRoom?.securityDeposite) }}</td>
                                                <td>{{ fomatFee(expensesByMonthAndRoom?.debt) }}</td>
                                                <td>{{ fomatFee(expensesByMonthAndRoom?.fine) }}</td>
                                                <td>
                                                    <div v-if="expensesByMonthAndRoom?.status == 'Paid'"
                                                        class="payment-status-paid payment-status">{{
                                                            expensesByMonthAndRoom?.status }}</div>
                                                    <div v-if="expensesByMonthAndRoom?.status == 'Partial Paid'"
                                                        class="payment-status-partial payment-status">{{
                                                            expensesByMonthAndRoom?.status }}
                                                    </div>
                                                    <div v-if="expensesByMonthAndRoom?.status == 'Unpaid'"
                                                        class="payment-status-unpaid payment-status">{{
                                                            expensesByMonthAndRoom?.status }}</div>
                                                </td>
                                                <td>
                                                    <a><i><img v-if="!isShowExpensesDetail"
                                                                src="../components/icons/eye.png" style="width: 23px;">
                                                            <img v-if="isShowExpensesDetail"
                                                                src="../components/icons/eye - Copy.png"
                                                                style="width: 23px;"></i></a>
                                                    <a href="#" @click="deleteExpenses(expensesByMonthAndRoom!.roomId)"><i><img src="../components/icons/TrashIcon.png"
                                                                style="width: 23px;"></i></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div v-if="isShowExpensesDetail">
                                <ExpensesDetail :roomId="roomIdSelectDetail" :year="year" />
                            </div>
                        </div>
                    </div>
                    <!-- Modal add new expense -->
                    <div class="modal fade" id="addNewExpensesModal" tabindex="-1"
                        aria-labelledby="addNewExpensesModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" style="max-width: 90%;justify-content: center;">
                            <div class="modal-content">
                                <AddNewExpenses :month="month" :year="year" />
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
import ExpensesDetail from "@/components/ExpensesByRoom.vue";
import AddNewExpenses from "@/components/AddNewExpenses.vue";
import { ref, nextTick } from "vue";
import type { IListPayment } from "@/type/IListPayment";
import type { Expenses } from "@/type/ExpenseDetail";
import paymentService from "@/services/paymentService";
import Swal from "sweetalert2";
import type { Room } from "@/type/Room";
import roomService from "@/services/roomService";
import expensesService from "@/services/expensesService";

const payment = ref<IListPayment[]>([]);
const roomsAvailable = ref<Room[]>([]);

const selectedRoomIdByMonth = ref(0);
var totalPage = 0;
var currentPage = 0;
const allRoom = ref<Room[]>([]);
const currentMonth = new Date().getMonth() + 1;
roomService.getAllRoom().then((response) => {
    allRoom.value = response.map((room: { roomId: any; roomStatus: any; maxTenant: any }) => ({
        roomId: room.roomId,
        roomStatus: room.roomStatus,
        maxTenant: room.maxTenant
    }));
})
const expensesByMonth = ref<Expenses[]>([])
const expensesByMonthAndRoom = ref<Expenses>()
const getExpensesByMonth = async () => {
  await expensesService
    .getExpensesByMonth(year.value, month.value)
    .then((response) => {
      expensesByMonth.value = response.content.map(
        (expenses: {
          roomId: any;
          month: any;
          rentalFee: any;
          electricPreviousMeter: any;
          electricCurrentMeter: any;
          waterPreviousMeter: any;
          waterCurrentMeter: any;
          debt: any;
          fine: any;
          status: any;
          internet: any;
          service: any;
          securityDeposite: any;
        }) => ({
          roomId: expenses.roomId,
          month: expenses.month,
          rentalFee: expenses.rentalFee,
          electricPreviousMeter: expenses.electricPreviousMeter,
          electricCurrentMeter: expenses.electricCurrentMeter,
          waterPreviousMeter: expenses.waterPreviousMeter,
          waterCurrentMeter: expenses.waterCurrentMeter,
          debt: expenses.debt,
          fine: expenses.fine,
          status: expenses.status,
          internet: expenses.internet,
          service: expenses.service,
          securityDeposite: expenses.securityDeposite,
        })
      );
      totalElement = response.totalElements;
      totalPage = response.totalPages;
      currentPage = response.pageable.pageNumber;
    });
  console.log(expensesByMonth.value);
};
const selectedGetRoom = async () => {
    await expensesService.getExpensesByMonthAndRoom(year.value, month.value, selectedRoomIdByMonth.value).then((response) => {
        expensesByMonthAndRoom.value = response;
    })
    console.log(expensesByMonthAndRoom.value);

}
const isShowExpensesDetail = ref(false);
const showExpensesDetail = async (roomId: number) => {
  roomIdSelectDetail.value = roomId;
  await nextTick(() => {
    if (isShowExpensesDetail.value == false) {
      getListPaymentByYearAndRoom(year.value, roomId);
      isShowExpensesDetail.value = true;
      return;
    }
    if (isShowExpensesDetail.value == true) {
      isShowExpensesDetail.value = false;
      getListPayment(year.value);
      return;
    }
  });
};
const roomIdSelectDetail = ref(0);
const fomatFee = (fee: any) => {
  if (isNaN(fee)) {
    fee = 0;
  }
  return new Intl.NumberFormat("vi-VN").format(fee);
};

const getRoomId = async () => {
  await roomService.getAllRoomAvailable().then((response) => {
    roomsAvailable.value = response.map(
      (room: { roomId: any; roomStatus: any; maxTenant: any }) => ({
        roomId: room.roomId,
        roomStatus: room.roomStatus,
        maxTenant: room.maxTenant,
      })
    );
  });
};
const year = ref(new Date().getFullYear());
const month = ref();
var totalElement = 0;
const getListPayment = (yearSelected: any) => {
  year.value = yearSelected;
  paymentService.getListPaymentByYear(yearSelected).then((response) => {
    payment.value = response.content.map(
      (payment: {
        roomId: any;
        dec: any;
        apr: any;
        aug: any;
        feb: any;
        jan: any;
        jul: any;
        jun: any;
        mar: any;
        may: any;
        nov: any;
        oct: any;
        sep: any;
        status: any;
      }) => ({
        roomId: payment.roomId,
        dec: payment.dec,
        apr: payment.apr,
        aug: payment.aug,
        feb: payment.feb,
        jan: payment.jan,
        jul: payment.jul,
        jun: payment.jun,
        mar: payment.mar,
        may: payment.may,
        nov: payment.nov,
        oct: payment.oct,
        sep: payment.sep,
        status: payment.status,
      })
    );
    totalElement = response.totalElements;
  });
};
const getListPaymentByYearAndRoom = async (yearSelected: any, roomId: any) => {
  year.value = yearSelected;
  await paymentService
    .getListPaymentByYearAndROom(yearSelected, roomId)
    .then((response) => {
      payment.value = response.content.map(
        (payment: {
          roomId: any;
          dec: any;
          apr: any;
          aug: any;
          feb: any;
          jan: any;
          jul: any;
          jun: any;
          mar: any;
          may: any;
          nov: any;
          oct: any;
          sep: any;
          status: any;
        }) => ({
          roomId: payment.roomId,
          dec: payment.dec,
          apr: payment.apr,
          aug: payment.aug,
          feb: payment.feb,
          jan: payment.jan,
          jul: payment.jul,
          jun: payment.jun,
          mar: payment.mar,
          may: payment.may,
          nov: payment.nov,
          oct: payment.oct,
          sep: payment.sep,
          status: payment.status,
        })
      );
      totalElement = response.totalElements;
    });
};
paymentService.getListPaymentByYear(year.value).then((response) => {
  payment.value = response.content.map(
    (payment: {
      roomId: any;
      dec: any;
      apr: any;
      aug: any;
      feb: any;
      jan: any;
      jul: any;
      jun: any;
      mar: any;
      may: any;
      nov: any;
      oct: any;
      sep: any;
      status: any;
    }) => ({
      roomId: payment.roomId,
      dec: payment.dec,
      apr: payment.apr,
      aug: payment.aug,
      feb: payment.feb,
      jan: payment.jan,
      jul: payment.jul,
      jun: payment.jun,
      mar: payment.mar,
      may: payment.may,
      nov: payment.nov,
      oct: payment.oct,
      sep: payment.sep,
      status: payment.status,
    })
  );
  totalElement = response.totalElements;
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");

.container {
    background: white;
    margin-top: 20px;
    box-shadow: -2px -1px 9px 0px rgba(0, 0, 0, 0.25);
    font-family: 'Poppins', sans-serif;
    border-radius: 14px;
    max-width: 97%;
    height: 95%;
}

.main-add-new {
  background: white;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}

.card {
    display: flex;
    justify-content: center;
    padding-top: 16px;
    /* margin-top: 3rem; */
    border: none;
}

.line-blue {
  width: 4px;
  background-color: #0064ff;
  margin-right: 12px;
}

.input-search {
  outline: none;
  border: none;
  border-radius: 17px;
  background-color: #e9e9e9;
  padding: 7px;
}

.btn {
  height: 30px;
  border-radius: 8px;
  border: none;
  margin: 10px 8px;
  cursor: pointer;
}

.btn-save {
  background-color: #0565f9;
  color: white;
  width: 68px;
  margin-right: 23px;
}

.btn-cancel {
  background-color: #e8e7e7;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

a {
  cursor: pointer;
}

.payment-status {
  border-radius: 6px;
  width: 94px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  justify-content: center;
}

.payment-status-paid {
  color: #009d3f;
  border: solid 2px #00d656fe;
  height: 27px;
}

.payment-status-partial {
  color: #ffbd5a;
  border: solid 2px #ffd79b;
  height: 27px;
}

.payment-status-unpaid {
  color: #fb2424;
  border: solid 2px #ff7d7d;
  height: 27px;
}

.customize-table {
  --easy-table-border: 0;
  --easy-table-header-font-size: 15px;
  --easy-table-header-height: 47px;
  --easy-table-body-row-height: 43px;
  --easy-table-header-font-color: #9b9b9b;
  --easy-table-footer-height: 49px;
}

.input-tenant-detail {
  border: none;
  border-radius: 5px;
}

.btn {
  height: 38px;
  border-radius: 8px;
  border: none;
  margin: 10px 8px;
  cursor: pointer;
}

.btn-add-new {
  background-color: #0565f9;
  color: white;
}

.form-add {
  background: white;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  width: 80%;
  margin-bottom: 12px;
}

.form-group {
  margin-left: 1rem;
  margin-right: 1rem;
  position: relative;
}

.input-add-new-expenses {
  font-family: "Poppins", sans-serif;
  line-height: 24px;
  outline: none;
  border: none;
  height: 43px;
  border-radius: 8px;
  background-color: #f5f6f8;
  width: 160px;
}

.input-group {
  display: flex;
}

.header-table-add-new {
  padding-bottom: 8px;
}

.bill {
  background: white;
  box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.25);
  width: 80%;
  margin-bottom: 12px;
  border-radius: 20px;
}

.row-table-bill {
  border-bottom: 1px solid #9ea0a7;
  height: 40px;
}

p {
  margin: 0;
}

.dp__theme_light {
    --dp-background-color: #E0DEDE66;
}
</style>

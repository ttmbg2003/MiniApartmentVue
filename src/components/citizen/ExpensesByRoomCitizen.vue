<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div class="container-expense-detail">
        <div style="display: flex;">
            <div style="margin-left: 18px;    text-align: center;">
                <label>Month</label><br />
                <select v-model="month"
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
                <select
                    style="cursor: pointer;height: 38px;width: 78px;text-align: center;border: 1px solid #0000002e;border-radius: 4px;outline: none;background-color:#E0DEDE66 ">
                    <option>{{ props.roomId }}</option>
                </select>
            </div>
        </div>
        <div style="display: flex;justify-content: flex-end;">
            <p style="margin-right: 31px; margin-bottom: 0;">Total: {{ totalElement }}</p>
        </div>
        <div style="margin: 12px;margin-top: 0; height: 15rem;">
            <table style="width: 100%;">
                <thead style="color: #9B9B9B;border-bottom: solid #B0B4CD 1px;height: 45px;">
                    <th style="padding-left: 10px;" class="header-table-add-new">Month</th>
                    <th class="header-table-add-new">Rental Fee <br />(VND)</th>
                    <th class="header-table-add-new">Electricity <br />
                        (3.800vnd)</th>
                    <th class="header-table-add-new">Water<br />
                        (35.000vnd)</th>
                    <th class="header-table-add-new">Internet<br />
                        (VND)</th>
                    <th class="header-table-add-new">Service<span style="color: red;">*</span><br />
                        (VND)</th>
                    <th class="header-table-add-new">Security Deposit<br />
                        (VND)</th>
                    <th class="header-table-add-new">Debt<br />
                        (VND)</th>
                    <th class="header-table-add-new">Fine<br />
                        (VND)</th>
                    <th class="header-table-add-new">Status</th>
                    <th class="header-table-add-new">Action</th>
                </thead>
                <tbody>
                    <tr v-for="expenses in expensesDetail" :key="expenses.month"
                        style="height: 40px;background-color: #9c9c9c17;">
                        <td style="padding-left: 10px;">{{ expenses.month }}</td>
                        <td>{{ fomatFee(expenses.rentalFee) }}</td>
                        <td>{{ fomatFee((expenses.electricCurrentMeter - expenses.electricPreviousMeter) * 3800) }}</td>
                        <td>{{ fomatFee((expenses.waterCurrentMeter - expenses.waterPreviousMeter) * 35000) }}</td>
                        <td>{{ fomatFee(expenses.internet) }}</td>
                        <td>{{ fomatFee(expenses.service) }}</td>
                        <td>{{ fomatFee(expenses.securityDeposite) }}</td>
                        <td>{{ fomatFee(expenses.debt) }}</td>
                        <td>{{ fomatFee(expenses.fine) }}</td>
                        <td>
                            <div v-if="expenses?.status == 'Paid'" class="payment-status-paid payment-status">{{
                                expenses?.status }}</div>
                            <div v-if="expenses?.status == 'Partial Paid'"
                                class="payment-status-partial payment-status">{{
                                    expenses?.status }}
                            </div>
                            <div v-if="expenses?.status == 'Unpaid'" class="payment-status-unpaid payment-status">{{
                                expenses?.status }}</div>
                        </td>
                        <td>
                            <a href="#" data-bs-toggle="modal" data-bs-target="#viewExpensesDetailModal"
                                @click="showExpensesDetail(expenses.roomId, expenses.month)"><i><img
                                        src="../icons/eye.png" style="width: 23px;"></i></a>

                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Modal view detail expense by month and room and year-->
            <div class="modal fade" id="viewExpensesDetailModal" tabindex="-1"
                aria-labelledby="viewExpensesDetailModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" style="max-width: 90%;justify-content: center;">
                    <div class="modal-content">
                        <ShowExpensesDetail v-bind:month="monthShowDetail" v-bind:year="year"
                            v-bind:room-id="roomIdShowDetail" @dataEmitted="handleQrUrl" />
                    </div>
                </div>
            </div>
            <!-- Modal -->
            <div class="modal fade" id="viewQR" tabindex="-1" aria-labelledby="viewQRModalLabel" aria-hidden="true"
                data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered" style="max-width: 40%;">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div style="    display: flex;justify-content: center;margin-bottom: 20px;">
                                <img style="width: 40%;    margin-right: 20px;" src="../icons/HanaBank.png">
                            </div>
                            <div style="display: flex;justify-content: center;margin-bottom: 15px;">
                                <img style="width: 229px;" :src="qrUrl">
                            </div>
                            <div style="display: flex;justify-content: center;">
                                <h4>Tran Tuan Minh</h4>

                            </div>
                            <div style="display: flex;justify-content: center;margin-bottom: 30px;">
                                <h4>1020052412003</h4>
                            </div>
                            <div>
                                <p>Please scan the QR code and enter the transfer details clearly to complete the
                                    payment.</p>
                                <p style="font-style: italic;">Syntax: Payment for rent of [room number] for [month]
                                    [year]</p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-cancel" data-bs-toggle="modal"
                                data-bs-target="#viewExpensesDetailModal">
                                Cancel
                            </button>
                            <button type="button" class="btn btn-save"
                                @click="checkPay(roomIdShowDetail, monthShowDetail, year)">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p style="font-style: italic;margin: 0;">Service <span style="color: red;">*</span>:
            Trash,
            light, cleaning, laundy, camera, security, parking</p>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
                <li class="page-item">
                    <a href="#" :class="currentPage == 0 ? 'disabled-a-tag' : ''"
                        @click="getExpensesByRoomId(currentPage - 1)"><i class="fa fa-angle-left"
                            style="font-size: x-large;"></i></a>
                </li>
                <li class="page-item" v-for="index in totalPage">
                    <a href="#" :class="(currentPage + 1) == index ? 'current-page' : 'non-current-page'"
                        @click="getExpensesByRoomId(index - 1)">{{ index }}</a>
                </li>
                <li class="page-item">
                    <a href="#" :class="currentPage == (totalPage - 1) ? 'disabled-a-tag' : ''"
                        @click="getExpensesByRoomId(currentPage + 1)"><i class="fa fa-angle-right"
                            style="font-size: x-large;"></i></a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script lang="ts" setup>
// import { defineProps } from 'vue';
import expensesService from "@/services/expensesService";
import ShowExpensesDetail from "@/components/citizen/ExpensesCitizenDetailByRoomAndMonth.vue"
import type { Expenses } from "@/type/ExpenseDetail";
import { ref } from "vue";
import ModalQR from './ModalQR.vue';
import Swal from "sweetalert2";
import paymentService from "@/services/paymentService";
import {useLoading} from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css';
const props = defineProps({
    roomId: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
    }
});
const qrUrl = ref('')

function handleQrUrl(url: string) {
    qrUrl.value = url
}
const roomIdShowDetail = ref(0);
const monthShowDetail = ref(0);
const showExpensesDetail = (roomId: number, month: number) => {
    roomIdShowDetail.value = roomId;
    monthShowDetail.value = month;
}
var totalPage = 0;
var currentPage = 0;
const month = ref();
const expensesDetail = ref<Expenses[]>([]);
var totalElement = 0;
const $loading = useLoading({
        // options
    });
const checkPay = async (roomId: number, month: number, year: any) => {
    const loader = $loading.show({
            // Optional parameters
        });
        // simulate AJAX
        setTimeout(() => {
            loader.hide()
        }, 5000)
    await paymentService.checkPay(year, month, roomId).then((res) => {
        if (res == "complete pay") {
            Swal.fire({
                text: `Complete pay for month ${month}!`,
                icon: "success",
                showConfirmButton: false,
            })
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
        if (res == "not complete pay" || res == "not pay") {
            Swal.fire({
                text: "Pay not complete. Are you want to check again?",
                showCancelButton: true,
                confirmButtonColor: "#0565F9",
                confirmButtonText: "Done",
                cancelButtonColor: "#E8E7E7",
                denyButtonColor: "#3333"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    checkPay(roomId,month,year)
                }
            })
        }
    })
}
const getExpensesByRoomId = async (pageNo: number) => {
    await expensesService.getExpensesCitizenByRoomId(props.year, props.roomId, pageNo).then(response => {
        expensesDetail.value = response.content.map((expenses: { roomId: any, month: any; rentalFee: any; electricPreviousMeter: any; electricCurrentMeter: any; waterPreviousMeter: any; waterCurrentMeter: any; debt: any; fine: any; status: any; internet: any; service: any; securityDeposite: any; }) => ({
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
            securityDeposite: expenses.securityDeposite
        }))
        totalElement = response.totalElements;
        totalPage = response.totalPages;
        currentPage = response.pageable.pageNumber;
    })

}
getExpensesByRoomId();
const fomatFee = (fee: number) => {
    if (isNaN(fee)) {
        fee = 0;
    }
    return new Intl.NumberFormat('vi-VN').format(fee);
}
</script>
<style scoped>
.container-expense-detail {
    background: white;
    box-shadow: rgba(0, 0, 0, 0.23) 0px 0px 4px;
    max-width: 100%;
}

.disabled-a-tag {
    pointer-events: none;
    color: #9B9B9B;
}

.page-item {
    margin-right: 10px;
}

.current-page {
    color: #000231;
}

.non-current-page {
    color: #9b9b9b;
    text-decoration: none;
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

.btn {
    border-radius: 8px;
    border: none;
    margin: 10px 8px;
    cursor: pointer;
}

.btn-save {
    background-color: #0565f9;
    color: white;
    width: 79px;
}

.btn-cancel {
    background-color: #e8e7e7;
}

.modal-footer {
    justify-content: center;
    padding: 0;
}
</style>
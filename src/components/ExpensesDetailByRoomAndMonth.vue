<template>

    <!-- <div class="modal-header">

                  <h5 class="modal-title" id="changePassModalLabel">Change Password</h5>
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div> -->
    <form @submit.prevent="submitStatus">
        <div class="modal-body" style="padding-bottom: 0;">
            <div>
                <div style="display: flex;">
                    <div style="    text-align: center;">
                        <label>Year</label><br />
                        <input :value="year" disabled
                            style="cursor: pointer;height: 38px;width: 60px;text-align: center;border: 1px solid #0000002e;border-radius: 4px;outline: none;background-color:#E0DEDE66 " />
                    </div>
                    <div style="margin-left: 30px;    text-align: center;">
                        <label>Month</label><br />
                        <input disabled :value="props.month"
                            style="cursor: pointer;height: 38px;width: 60px;text-align: center;border: 1px solid #0000002e;border-radius: 4px;outline: none;background-color:#E0DEDE66 ">
                    </div>
                    <div style="text-align: center;margin-left: 30px;">
                        <label>Room</label><br />
                        <input class="input-add-new-expenses" :value="props.roomId" disabled
                            style="cursor: pointer;height: 38px;width: 60px;text-align: center;border: 1px solid #0000002e;border-radius: 4px;outline: none;background-color:#E0DEDE66 ">
                    </div>
                </div>
            </div>
            <div class="main-add-new">
                <div style="margin: 0 10px 7px 10px;padding-top: 12px;">
                    <table style="width: 100%;    font-size: 14px;">
                        <thead style="color: #9B9B9B;">
                            <th class="header-table-add-new">Room No</th>
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
                            <th class="header-table-add-new" style="    width: 134px;">Status
                            </th>
                            <th class="header-table-add-new">Action</th>
                        </thead>
                        <tbody>
                            <tr style="height: 35px;background-color: #9c9c9c17;">
                                <td>{{ props.roomId }}</td>
                                <td>{{ fomatFee(rentalFee) }}</td>
                                <td>{{ fomatFee(electricityFee) }}</td>
                                <td>{{ fomatFee(waterFee) }}</td>
                                <td>{{ fomatFee(expenses?.internet) }}</td>
                                <td>{{ fomatFee(expenses?.service) }}</td>
                                <td>{{ fomatFee(expenses?.securityDeposite) }}</td>
                                <td>{{ expenses?.debt }}</td>
                                <td>{{ expenses?.fine }}</td>
                                <td>
                                    <select v-if="expenses?.status == 'Paid'" class="payment-status-paid payment-status" v-model="expenses.status">
                                        <option value="Paid" style="color: black;" >Paid</option>
                                        <option value="Partial Paid" style="color: black;" >Partial Paid</option>
                                        <option value="Unpaid" style="color: black;" >Unpaid</option>
                                    </select>
                                    <select v-if="expenses?.status == 'Partial Paid'" class="payment-status-partial payment-status"  v-model="expenses.status">
                                        <option value="Paid" style="color: black;" >Paid</option>
                                        <option value="Partial Paid" style="color: black;" >Partial Paid</option>
                                        <option value="Unpaid" style="color: black;" >Unpaid</option>
                                    </select>
                                    <select v-if="expenses?.status == 'Unpaid'" class="payment-status-unpaid payment-status"  v-model="expenses.status">
                                        <option value="Paid" style="color: black;" >Paid</option>
                                        <option value="Partial Paid" style="color: black;" >Partial Paid</option>
                                        <option value="Unpaid" style="color: black;" >Unpaid</option>
                                    </select>
                                    <!-- <div v-if="expenses?.status == 'Paid'" class="payment-status-paid payment-status">{{
                                        expenses?.status }}</div>
                                    <div v-if="expenses?.status == 'Partial Paid'"
                                        class="payment-status-partial payment-status">{{
                                            expenses?.status }}
                                    </div>
                                    <div v-if="expenses?.status == 'Unpaid'"
                                        class="payment-status-unpaid payment-status">{{
                                            expenses?.status }}</div> -->

                                </td>
                                <td><a><i><img src="../components/icons/eye.png" style="width: 23px;">
                                        </i></a>
                                    <a href="#"><i><img src="../components/icons/TrashIcon.png"
                                                style="width: 23px;"></i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style="font-style: italic;">Service <span style="color: red;">*</span>:
                    Trash,
                    light, cleaning, laundy, camera, security, parking</p>
                <div class="row">
                    <div class="col" style="display: flex;justify-content: end;margin-right: 20px;">
                        <div class="form-add">
                            <div style="    margin: 6px;">

                                <h6 style="font-weight: 600;">Living Expenses</h6>
                                <form @submit.prevent="submitFormExpenses">
                                    <div class="input-group">
                                        <div class="form-group">
                                            <label>Creation Date<span style="color: red;">*</span></label><br />
                                            <input type="date" class="input-add-new-expenses" />
                                        </div>
                                        <div class="form-group">
                                            <label>Due Date<span style="color: red;">*</span></label><br />
                                            <input type="date" class="input-add-new-expenses" />
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <div class="form-group">
                                            <label>Room No<span style="color: red;">*</span></label><br />
                                            <input type="text" :value="props.roomId" class="input-add-new-expenses"
                                                disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Representative<span style="color: red;">*</span></label><br />
                                            <input type="text" :value="representative" class="input-add-new-expenses"
                                                disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Total</label><br />
                                            <input type="text" class="input-add-new-expenses" :value="fomatFee(rentalFee + securityDeposite +
                                                electricityFee + waterFee + internetFee +
                                                serviceFee)" disabled />
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <div class="form-group">
                                            <label>Rental Fee</label><br />
                                            <input type="text" :value="rentalFee" class="input-add-new-expenses"
                                                disabled />
                                        </div>
                                        <div class="form-group">
                                            <label>Security Deposit</label><br />
                                            <input type="text" :value="securityDeposite" class="input-add-new-expenses"
                                                disabled />
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <div class="form-group">
                                            <label>Electricity</label><br />
                                            <input type="text" v-model="electricityFee" class="input-add-new-expenses"
                                                disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Previous Meter</label><br />
                                            <input type="text" class="input-add-new-expenses"
                                                v-model="electricityPreviousMetter" :disabled="securityDeposite != 0" />
                                        </div>
                                        <div class="form-group">
                                            <label>Current Meter</label><br />
                                            <input type="text" class="input-add-new-expenses"
                                                v-model="electricityCurrentMetter" @change="calculatorElectricFee"
                                                :disabled="securityDeposite != 0" />
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <div class="form-group">
                                            <label>Water</label><br />
                                            <input type="text" class="input-add-new-expenses" v-model="waterFee"
                                                disabled />
                                        </div>
                                        <div class="form-group">
                                            <label>Previous Meter</label><br />
                                            <input type="text" class="input-add-new-expenses"
                                                v-model="waterPreviousMetter" :disabled="securityDeposite != 0" />
                                        </div>
                                        <div class="form-group">
                                            <label>Current Meter</label><br />
                                            <input type="text" class="input-add-new-expenses"
                                                @change="calculateWaterFee" v-model="waterCurrentMetter"
                                                :disabled="securityDeposite != 0" />
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <div class="form-group">
                                            <label>Internet</label><br />
                                            <input type="text" class="input-add-new-expenses" v-model="internet"
                                                disabled />
                                        </div>
                                        <div class="form-group">
                                            <label>Service</label><br />
                                            <input type="text" class="input-add-new-expenses" v-model="service"
                                                :disabled="securityDeposite != 0" />
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <div class="form-group">
                                            <label>Debt</label><br />
                                            <input type="text" class="input-add-new-expenses" disabled v-model="debt" />
                                        </div>
                                        <div class="form-group">
                                            <label>Fine</label><br />
                                            <input type="text" class="input-add-new-expenses" v-model="fine" />
                                        </div>
                                        <div class="form-group">
                                            <label>Fine Reason</label><br />
                                            <input type="text" class="input-add-new-expenses">
                                        </div>
                                    </div>
                                    <div style="display: flex;justify-content: center;">
                                        <button type="button" @click="submitFormExpenses"
                                            class="btn btn-save">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col" style="display: flex;margin-left: 20px;">
                        <div class="bill">
                            <div style="margin: 10px 25px 10px 20px;">
                                <h5 style="font-weight: 600;">Living Expenses</h5>
                                <div style="display: flex;">
                                    <p class="col">Invoice Date</p>
                                    <p class="col">01 Feb,2021</p>
                                </div>
                                <div style="display: flex;">
                                    <p class="col">Due Date</p>
                                    <p class="col">01 Feb,2021</p>
                                </div>
                                <p>Below is the detailed breakdown of living expenses for your
                                    room.
                                </p>
                                <div>
                                    <table style="width: 100%; text-align: end;">
                                        <thead>
                                            <th style="text-align: start;">Description</th>
                                            <th>Usage</th>
                                            <th>Price</th>
                                            <th>Amount</th>
                                        </thead>
                                        <tbody>
                                            <tr class="row-table-bill">
                                                <td style="text-align: start;">Rental Fee</td>
                                                <td>1 month</td>
                                                <td>{{ fomatFee(rentalFee) }}</td>
                                                <td>{{ fomatFee(rentalFee) }}</td>
                                            </tr>
                                            <tr class="row-table-bill">
                                                <td style="text-align: start;">Electricity</td>
                                                <td>{{
                                                    (electricityCurrentMetter -
                                                        electricityPreviousMetter).toFixed(1)
                                                }} kWh</td>
                                                <td>3.800 VND</td>
                                                <td>{{ fomatFee(electricityFee) }}</td>
                                            </tr>
                                            <tr class="row-table-bill">
                                                <td style="text-align: start;">Water</td>
                                                <td>{{ (waterCurrentMetter -
                                                    waterPreviousMetter).toFixed(1) }}
                                                    m³</td>
                                                <td>35.000 VND</td>
                                                <td>{{ fomatFee(waterFee) }}</td>
                                            </tr>
                                            <tr class="row-table-bill">
                                                <td style="text-align: start;">Internet</td>
                                                <td>1 month</td>
                                                <td>100.000 VND</td>
                                                <td>100.000 VND</td>
                                            </tr>
                                            <tr class="row-table-bill">
                                                <td style="text-align: start;">Service<span style="color: red;">*</span>
                                                </td>
                                                <td>{{ numberOfTenant }} people</td>
                                                <td>130.000 VND</td>
                                                <td>{{ fomatFee(serviceFee) }}</td>
                                            </tr>
                                            <tr class="row-table-bill">
                                                <td style="text-align: start;">Security Deposit
                                                </td>
                                                <td>1 month</td>
                                                <td>{{ fomatFee(securityDeposite) }}</td>
                                                <td>{{ fomatFee(securityDeposite) }}</td>
                                            </tr>
                                            <tr class="row-table-bill">
                                                <td style="text-align: start;">Debt</td>
                                                <td>3.800 vnd</td>
                                                <td>3.800 vnd</td>
                                            </tr>
                                            <tr class="row-table-bill">
                                                <td style="text-align: start;">Fine</td>
                                                <td>3.800 vnd</td>
                                                <td>3.800 vnd</td>
                                            </tr>
                                            <tr class="row-table-bill">
                                                <td></td>
                                                <td></td>
                                                <td style="font-style: italic;font-weight: 600;">
                                                    Total: </td>
                                                <td style="font-style: italic;font-weight: 600;">
                                                    {{
                                                        fomatFee(rentalFee + securityDeposite +
                                                            electricityFee + waterFee + internetFee +
                                                            serviceFee)
                                                    }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p style="font-style: italic;">Service <span style="color: red;">*</span>:
                                    Trash,
                                    light, cleaning, laundy, camera, security, parking</p>
                                <p style="font-style: italic;font-weight: 600;">
                                    Please complete the payment within the first 5 days of the
                                    month
                                    from the invoice date. Thanks!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-cancel" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-save">Save</button>
        </div>
    </form>
</template>
<script lang="ts" setup>
import contractService from '@/services/contractService';
import expensesService from '@/services/expensesService';
import roomService from '@/services/roomService';
import type { Expenses } from '@/type/ExpenseDetail';
import type { IRentalFee } from '@/type/IRentalFeeOfContract';
import type { Room } from '@/type/Room';
import { fi } from 'element-plus/es/locale/index.mjs';
import Swal from 'sweetalert2';
import { ref, watch } from 'vue';

const props = defineProps({
    year: {
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    roomId: {
        type: Number,
        required: true,
    }
});

const expenses = ref<Expenses>();
const representative = ref();
const rentalFee = ref(0);
const securityDeposite = ref(0);
const electricityFee = ref(0);
const waterFee = ref(0);
var waterPreviousMetter = 0;
var waterCurrentMetter = 0;
var electricityPreviousMetter = 0;
var electricityCurrentMetter = 0;
var internet = 0;
var service = 0;
var debt = 0;
var fine = 0;
var numberOfTenant = 0;
const internetFee = ref(100000);
const serviceFee = ref(0);
const inforOfContract = ref<IRentalFee>();
const selectedRoomId = ref(0);
const selectedRoom = async () => {
    if (props.roomId != 0) {
        inforOfContract.value = await contractService.getRepesentativeByRoomId(props.roomId, props.month);
        representative.value = inforOfContract.value!.representative;
        rentalFee.value = inforOfContract.value!.rentalFee;
        securityDeposite.value = inforOfContract.value!.securityDeposite;
        numberOfTenant = inforOfContract.value!.numberOfTenant;
        serviceFee.value = numberOfTenant * 130000;
    }
}
const getExpensesDetailByRoom = async () => {
    if (props.roomId != 0) {
        await expensesService.getExpensesByMonthAndRoom(props.year, props.month, props.roomId).then((res) => {
            expenses.value = res;
        })
        waterCurrentMetter = expenses.value!.waterCurrentMeter;
        waterPreviousMetter = expenses.value!.waterPreviousMeter;
        electricityCurrentMetter = expenses.value!.electricCurrentMeter;
        electricityPreviousMetter = expenses.value!.electricPreviousMeter;
        electricityFee.value = (expenses.value!.electricCurrentMeter - expenses.value!.electricPreviousMeter) * 3800;
        waterFee.value = (expenses.value!.waterCurrentMeter - expenses.value!.waterPreviousMeter) * 35000;
        internet = expenses.value!.internet;
        service = expenses.value!.service;
        debt = expenses.value!.debt;
        fine = expenses.value!.fine;
    }
}
watch(() => [props.roomId, props.month, props.year], () => {
    selectedRoom(),
        getExpensesDetailByRoom()
}, { immediate: true });
const submitStatus = async() => {
    console.log("submit form status");
    expenses.value.roomId = props.roomId;
    expenses.value.year = expenses.value?.year.split("-")[0]
    console.log(expenses.value);
    await expensesService.updateExpensesStatus(expenses.value).then((res) => {
        console.log(res);
        
    })
}
const submitFormExpenses = () => {
    console.log("submit form expenses");
    // Swal.fire({
    //     text: "Are you sure want to save?",
    //     icon: "question",
    //     showCancelButton: true,
    //     confirmButtonColor: "#0565F9",
    //     confirmButtonText: "Save",
    //     cancelButtonColor: "#E8E7E7",
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         // if(securityDeposite.value == 0 &&  )
    if (securityDeposite.value == 0 && (electricityFee.value == 0 || waterFee.value == 0)) {
        Swal.fire({
            text: "Invalid data",
            icon: "error",
        })
    }
    else {
        expenses.value = {
            roomId: selectedRoomId.value,
            electricCurrentMeter: electricityCurrentMetter,
            electricPreviousMeter: electricityPreviousMetter,
            internet: internetFee.value,
            fine: 0,
            debt: 0,
            rentalFee: rentalFee.value,
            securityDeposite: securityDeposite.value,
            service: serviceFee.value,
            waterCurrentMeter: waterCurrentMetter,
            waterPreviousMeter: waterPreviousMetter,
            year: props.year.toString(),
            month: props.month,
            status: "Unpaid"
        }
        expensesService.addNewExpenses(expenses.value).then((response) => {
            if (response == "add success") {
                Swal.fire({
                    text: "Save success !",
                    icon: "success"
                })
            } else {
                Swal.fire({
                    text: "Save fail !",
                    icon: "error"
                })
            }
        })
    }
    // }
    // });

}
const calculateWaterFee = () => {
    if (waterCurrentMetter != 0 && waterPreviousMetter != 0) {
        waterFee.value = Math.round((waterCurrentMetter - waterPreviousMetter) * 35000);
        console.log(waterCurrentMetter);

        console.log(waterFee.value);

    }
}
const calculatorElectricFee = () => {
    if (electricityPreviousMetter != 0 && electricityCurrentMetter != 0) {
        electricityFee.value = Math.round((electricityCurrentMetter - electricityPreviousMetter) * 3800);
    }
}
const fomatFee = (fee: any) => {
    if (isNaN(fee)) {
        fee = 0;
    }
    return new Intl.NumberFormat('vi-VN').format(fee);
}
</script>
<style scoped>
.main-add-new {
    background: white;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}

.card {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    border: none;
}

.line-blue {
    width: 4px;
    background-color: #0064FF;
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
    background-color: #0565F9;
    color: white;
    width: 68px;
    margin-right: 23px;
}

.btn-cancel {
    background-color: #e8e7e7;
}

.modal-footer {
    display: flex;
    height: 45px;
    justify-content: center;
    align-items: center;
    align-content: center;
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
    border-radius: 5px
}

.btn {
    height: 38px;
    border-radius: 8px;
    border: none;
    margin: 10px 8px;
    cursor: pointer;
}

.btn-add-new {
    background-color: #0565F9;
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
    font-family: 'Poppins', sans-serif;
    /* line-height: 24px; */
    outline: none;
    border: none;
    height: 37px;
    border-radius: 8px;
    background-color: #F5F6F8;
    width: 153px;
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
    height: 30px;
}

p {
    margin: 0;
}

.dp__theme_light {
    --dp-background-color: #E0DEDE66;
}
</style>
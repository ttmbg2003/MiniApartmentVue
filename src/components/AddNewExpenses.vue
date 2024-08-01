<!-- eslint-disable vue/require-v-for-key -->
<template>

    <!-- <div class="modal-header">

                  <h5 class="modal-title" id="changePassModalLabel">Change Password</h5>
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div> -->
    <form @submit.prevent="submitStatus">
        <div class="modal-body" style="padding-bottom: 0;">
            <div>
                <p style="color: #0265FF;"><i><img src="../components/icons/circled-plusblue.png"
                            style="width: 23px; "></i>Add new</p>
            </div>
            <div>
                <div style="display: flex;">
                    <div style="    text-align: center;">
                        <label>Year</label>
                        <VueDatePicker :model-value="year" year-picker :year-range="[2020, 2040]" :clearable="false"
                            placeholder="Select year" style="width: 107px" />
                    </div>
                    <div style="margin-left: 30px;    text-align: center;">
                        <label>Month</label><br />
                        <select v-model="props.month"
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
                    <div style="text-align: center;margin-left: 30px;">
                        <label>Room</label><br />
                        <select class="input-add-new-expenses" v-model="selectedRoomId" @change="selectedRoom"
                            style="cursor: pointer;height: 38px;width: 60px;text-align: center;border: 1px solid #0000002e;border-radius: 4px;outline: none;background-color:#E0DEDE66 ">
                            <option v-for="room in roomsAvailable" :value="room.roomId">{{ room.roomId }}
                            </option>
                        </select>
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
                                <td>{{ selectedRoomId }}</td>
                                <td>{{ fomatFee(rentalFee) }}</td>
                                <td>{{ fomatFee(electricityFee) }}</td>
                                <td>{{ fomatFee(waterFee) }}</td>
                                <td>{{ fomatFee(internetFee) }}</td>
                                <td>{{ fomatFee(serviceFee) }}</td>
                                <td>{{ fomatFee(securityDeposite) }}</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
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

                                <h5 style="font-weight: 600;">Living Expenses</h5>
                                <form @submit.prevent="submitFormExpenses">
                                    <div class="input-group">
                                        <div class="form-group">
                                            <label>Creation Date<span style="color: red;">*</span></label><br />
                                            <input type="date" class="input-add-new-expenses" v-model="createDate" />
                                        </div>
                                        <div class="form-group">
                                            <label>Due Date<span style="color: red;">*</span></label><br />
                                            <input type="date" class="input-add-new-expenses" v-model="dueDate" />
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <div class="form-group">
                                            <label>Room No<span style="color: red;">*</span></label><br />
                                            <input type="text" :value="selectedRoomId" class="input-add-new-expenses"
                                                disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Representative<span style="color: red;">*</span></label><br />
                                            <input type="text" :value="representative" class="input-add-new-expenses"
                                                disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Total</label><br />
                                            <input type="text" class="input-add-new-expenses"
                                                :value="fomatFee(totalFee)" disabled />
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
                                            <input type="text" class="input-add-new-expenses" v-model="internetFee"
                                                disabled />
                                        </div>
                                        <div class="form-group">
                                            <label>Service</label><br />
                                            <input type="text" class="input-add-new-expenses" v-model="serviceFee"
                                                :disabled="securityDeposite != 0" @change="sumTotal" />
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <div class="form-group">
                                            <label>Debt</label><br />
                                            <input type="text" class="input-add-new-expenses" disabled />
                                        </div>
                                        <div class="form-group">
                                            <label>Fine</label><br />
                                            <input type="text" class="input-add-new-expenses" />
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
                                    <p class="col">{{ formatDate(createDate) }}</p>
                                </div>
                                <div style="display: flex;">
                                    <p class="col">Due Date</p>
                                    <p class="col">{{ formatDate(dueDate) }}</p>
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
                                                        fomatFee(totalFee)
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
import { get } from '@vueuse/core';
import Swal from 'sweetalert2';
import { ref } from 'vue';

const props = defineProps({
    year: {
        type: Number,
        required: true,
    },
    month: {
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
var numberOfTenant = 0;
const internetFee = ref(100000);
const serviceFee = ref(0);
const inforOfContract = ref<IRentalFee>();
const selectedRoomId = ref(0);
const totalFee = ref(0);
const sumTotal = () => {
    let service = Math.round(serviceFee.value)
    totalFee.value = rentalFee.value + securityDeposite.value +
        electricityFee.value + waterFee.value +
        internetFee.value + service;
}
const createDate = ref('');
const dueDate = ref('')
const setTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    createDate.value = `${year}-${month}-${day}`;
};
const setDueDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = (today.getDate() + 5).toString().padStart(2, '0');

    dueDate.value = `${year}-${month}-${day}`;
};
setDueDate();
setTodayDate();
const formatDate = (dateString: string): string => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
};
const selectedRoom = async () => {
    inforOfContract.value = await contractService.getRepesentativeByRoomId(selectedRoomId.value, props.month);
    representative.value = inforOfContract.value?.representative;
    rentalFee.value = inforOfContract.value!.rentalFee;
    securityDeposite.value = inforOfContract.value!.securityDeposite;
    numberOfTenant = inforOfContract.value!.numberOfTenant;
    serviceFee.value = numberOfTenant * 130000;
    sumTotal();
}
const roomsAvailable = ref<Room[]>([]);
const getRoomId = async () => {
    await roomService.getAllRoomAvailable().then((response) => {
        roomsAvailable.value = response.map((room: { roomId: any; roomStatus: any; maxTenant: any }) => ({
            roomId: room.roomId,
            roomStatus: room.roomStatus,
            maxTenant: room.maxTenant
        }));
    })
}
getRoomId();
const submitStatus = () => {
    console.log("submit form status");
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
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
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
        sumTotal();
    }
}
const calculatorElectricFee = () => {
    if (electricityPreviousMetter != 0 && electricityCurrentMetter != 0) {
        electricityFee.value = Math.round((electricityCurrentMetter - electricityPreviousMetter) * 3800);
        sumTotal();
    }
}
const fomatFee = (fee: number) => {
    if (isNaN(fee)) {
        fee = 0;
    }
    return new Intl.NumberFormat('vi-VN').format(fee) + " VND";
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
    height: 34px;
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
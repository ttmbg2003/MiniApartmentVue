<template>
  <div class="container" v-if="dataLoaded == true">
    <div style="font-weight: 500; font-size: 16px">Room Status Overview</div>
    <div class="chart">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
    <div class="total">
      <p style="font-size: 18px; color: rgb(146, 146, 146); margin: 0">
        Total Rooms
      </p>
      <p style="font-weight: bold; font-size: 28px; margin: 0">{{ total }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import reportService from "@/services/reportService";

import { onMounted, watch, ref } from "vue";
const prop = defineProps({
  month: Number,
  year: Number,
});
const occupiedCount = ref(null);
const reservedCount = ref(null);
const vacantCount = ref(null);

const fetchData = async () => {
  if (prop.month !== undefined && prop.year !== undefined) {
    const res = await reportService.getRoomByStatus(prop.month, prop.year);
    occupiedCount.value = res.occupiedCount;
    reservedCount.value = res.reservedCount;
    vacantCount.value = res.vacantCount;
    dataLoaded.value = true;
    chartData.value.datasets[0].data = [
      vacantCount.value,
      reservedCount.value,
      occupiedCount.value,
    ];
  }
};
onMounted(fetchData);

console.log(vacantCount.value);
ChartJS.register(Tooltip, Legend, ArcElement);
// const loaded = ref(false);
// const chartData = ref(null);

const chartData = ref({
  labels: ["Vacant", "Reserved", "Occupied"],
  datasets: [
    {
      data: [vacantCount.value, reservedCount.value, occupiedCount.value],
      backgroundColor: ["#3070f5", "#57beb5", "#ae59dc"],
    },
  ],
});

// reportService.getRoomByStatus().then((res) => {
//     occupiedCount.value = res.occupiedCount;
//     reservedCount.value = res.reservedCount;
//     vacantCount.value = res.vacantCount;
//     console.log("-----------------");

//     chartData.value.datasets[0].data = [10,10,10];

//         // Cập nhật dữ liệu biểu đồ
//     console.log(vacantCount.value);
//   });
const dataLoaded = ref(false);

const total = ref(50);
const chartOptions = {
  responsive: true,
  cutout: "70%",
  plugins: {
    legend: {
      position: "bottom",
      elements: {
        arc: {
          borderWidth: 2, // Độ rộng viền cho tất cả các phần tử
        },
      },
      align: "center",

      labels: {
        padding: 10,

        font: {
          size: 12,
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
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
}

.chart {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 233px;
}

.total {
  display: flex;
  flex-direction: column;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  align-items: center;
}
</style>

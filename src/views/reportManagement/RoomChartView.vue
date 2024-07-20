<template>
  <div class="container">
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

ChartJS.register(Tooltip, Legend, ArcElement);
// const loaded = ref(false);
// const chartData = ref(null);

const chartData = {
  labels: ["Vacant", "Reserved", "Occupied"],
  datasets: [
    {
      data: [40, 20, 12],
      backgroundColor: ["#3070f5", "#57beb5", "#ae59dc"],
    },
  ],
};
const total = chartData.datasets[0].data.reduce(
  (acc, currentValue) => acc + currentValue,
  0
);
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
  },
};

// onMounted(async () => {
//   loaded.value = true;
//   try {
//     const response = await fetch('/api/userlist');
//     if (!response.ok) {
//       throw new Error('Failed to fetch');
//     }
//     const { userlist } = await response.json();
//     loaded.value = true
//     chartData.value = userlist;
//   } catch (e) {
//     console.error(e);
//     // Xử lý lỗi, ví dụ: thông báo lỗi cho người dùng
//   }
//});
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

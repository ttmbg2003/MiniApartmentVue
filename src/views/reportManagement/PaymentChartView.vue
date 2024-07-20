<template>
  <div class="container">
    <div style="font-weight: 500">On - time payment month by month</div>
    <div class="chart">
      <Line :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Line } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,

  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler
);
const chartData = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  datasets: [
    {
      label: "On-time",
      borderColor: "#5CC8BE",
      backgroundColor: "#5CC8BE",

      borderWidth: 2,
      data: [50, 40, 45, 60, 45, 55, 50, 55, 60, 56, 80, 95],

      tension: 0.3,
      pointRadius: 0,
    },
    {
      label: "Overdue",
      borderColor: "blue",
      backgroundColor: "blue",
      borderWidth: 2,
      data: [10, 20, 35, 20, 15, 25, 10, 15, 20, 16, 20, 25],

      tension: 0.3,
      pointRadius: 0,
    },
  ],
};
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    filler: {
      propagate: false,
    },
    title: {
      display: false, // Xóa title phía trên biểu đồ
    },
    legend: {
      display: true, // Xóa legend (chú giải) của biểu đồ
      labels: {
        padding: 10,
        font: {
          size: 12,
          style: "bold",
        },

        color: "#000",
        usePointStyle: true,
        pointStyle: "rect",
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Ẩn lưới tọa độ trục X
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 20,
      },
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.chart {
  margin-left: -15px;
  width: 110%;
  height: 230px;
}
</style>

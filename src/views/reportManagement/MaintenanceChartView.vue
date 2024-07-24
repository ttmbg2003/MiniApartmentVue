<template>
  <div class="main">
    <div style="font-weight: 400; font-size: 14px; margin: 0px">
      Maintenance Count by Status
    </div>

    <Bar :data="chartData" :options="chartOptions"></Bar>
    <div class="legend">
      <ul>
        <li v-for="(item, index) in chartData.datasets" :key="index">
          <!-- Hiển thị màu và nhãn cho mỗi phần tử -->
          <div style="display: flex; align-items: baseline">
            <span
              :style="{
                backgroundColor: item.backgroundColor,
              }"
            ></span>
            <p>{{ item.label }}</p>
          </div>

          <div style="float: right">{{ item.data[0] }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = {
  labels: ["Maintenance"],
  datasets: [
    {
      label: "Approval Pending",
      backgroundColor: "#4A729D",
      data: [20],
    },
    {
      label: "Scheduled",
      backgroundColor: "#2196F3",
      data: [12],
    },
    {
      label: "In Progress",
      backgroundColor: "#D7E1E5",
      data: [16],
    },
    {
      label: "Done",
      backgroundColor: "#2DA84E",
      data: [28],
    },
    {
      label: "Over Due",
      backgroundColor: "#FF9C00",
      data: [3],
    },
  ],
};
const chartOptions = {
  indexAxis: "y",
  scales: {
    x: {
      display: false,
      stacked: true,
    },
    y: {
      display: false,
      stacked: true,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Xóa legend (chú giải) của biểu đồ
    },
    datalabels: {
      display: false,
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
canvas {
  position: absolute;
  top: 30px;

  height: 20px !important;
}
.legend {
  position: absolute;
  width: 100%;
  top: 60px;
  left: -10px;
}
.legend ul {
  list-style-type: none;
  display: flex;

  flex-direction: column;
}
.legend li {
  display: inline-flex;
  justify-content: space-between;

  height: 25px;
  padding: 0;
  margin-top: 5px;
}
.legend span {
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-right: 5px;
  border-radius: 2px;
}
</style>

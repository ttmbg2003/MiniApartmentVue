<template>
  <div class="container">
    <h6>Tenant Changes month by month (%)</h6>
    <div class="chart">
      <Line v-if="checkData" :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import reportService from "@/services/reportService";
import { ref } from "vue";
import { Line } from "vue-chartjs";

import gradient from "chartjs-plugin-gradient";
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
  Filler,
  gradient
);
const chartData = ref({
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  datasets: [
    {
      label: "null",
      borderColor: "rgba(64,138,253,255)",
      gradient: {
        backgroundColor: {
          axis: "y",
          colors: {
            0: "white",
            100: "rgba(64,138,253,0.2)",
          },
        },
      },
      borderWidth: 2,
      data: [50, 40, 45, 60, 45, 55, 50, 55, 60, 56, 80, 95],
      fill: true,
      tension: 0.3,
      pointRadius: 0,
    },
  ],
});
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    gradient,
    filler: {
      propagate: false,
    },
    title: {
      display: false, // Xóa title phía trên biểu đồ
    },
    legend: {
      display: false, // Xóa legend (chú giải) của biểu đồ
    },
    datalabels: {
      display: false,
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
      max: 100,
      ticks: {
        stepSize: 20,
      },
    },
  },
};

interface tenantsEachMonth {
  month: number;
  tenants: number;
}
const checkData = ref(false);
const tenantByMonths = ref<tenantsEachMonth[]>([]);
reportService.getTenantByMonths().then((res) => {
  tenantByMonths.value = res;
  chartData.value.datasets[0].data = res.map((item: tenantsEachMonth) =>
    parseFloat(formatPercentage(item.tenants))
  );
  checkData.value = true;
  console.log(chartData.value.datasets[0].data);
});
function formatPercentage(tenant: number) {
  const percent = (tenant / 120) * 100;
  return percent % 1 === 0 ? percent.toFixed(0) : percent.toFixed(1);
}
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

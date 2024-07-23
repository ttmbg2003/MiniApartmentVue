<template>
  <div class="tenant-sat-main">
    <div class="chart1">
      <Bar :options="chartOptionsForBar" :data="chartDataForBar" />
    </div>
    <div class="chart2">
      <canvas id="chart1" ref="gaugeChart"></canvas>
      <div v-if="gaugeChart" class="icons">
        <div v-if="doughnutValue < 20">
          <font-awesome-icon
            :icon="['fas', 'face-angry']"
            style="color: #ff0606; width: 26px; height: 26px"
          />
        </div>
        <div v-else-if="doughnutValue < 40">
          <font-awesome-icon
            :icon="['fas', 'face-frown']"
            style="color: #ff9500; width: 26px; height: 26px"
          />
        </div>
        <div v-else-if="doughnutValue < 60">
          <font-awesome-icon
            :icon="['fas', 'face-meh']"
            style="color: #f85418; width: 26px; height: 26px"
          />
        </div>
        <div v-else-if="doughnutValue < 80">
          <font-awesome-icon
            :icon="['fas', 'face-smile']"
            style="color: #00b448; width: 26px; height: 26px"
          />
        </div>
        <div v-else>
          <font-awesome-icon
            :icon="['fas', 'face-laugh-squint']"
            style="color: #0164ff; width: 26px; height: 26px"
          />
        </div>
      </div>
      <div class="title">
        <div v-if="doughnutValue < 20" style="color: #ff0606; font-weight: 600">
          Very dissatisfied
        </div>
        <div
          v-else-if="doughnutValue < 40"
          style="color: #ff9500; font-weight: 600"
        >
          Dissatisfied
        </div>
        <div
          v-else-if="doughnutValue < 60"
          style="color: #f85418; font-weight: 600"
        >
          Neutral
        </div>
        <div
          v-else-if="doughnutValue < 80"
          style="color: #00b448; font-weight: 600"
        >
          Satisfied
        </div>
        <div v-else style="color: #0164ff; font-weight: 600">
          Very satisfied
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { ref, onMounted } from "vue";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels,
  ArcElement
);

const chartDataForBar = {
  labels: ["Cleaning", "Payment", "Parking", "Security and safety"],
  datasets: [
    {
      axis: "y",
      label: "My First Dataset",
      data: [93, 73, 60, 20],
      fill: false,
      backgroundColor: ["#FA0A0ACC", "#05D85A", "#F8BD00", "#99C1FF"],
      borderSkipped: false,
      borderRadius: 10,

      barThickness: 10,
    },
  ],
};

const chartOptionsForBar = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y",
  scales: {
    x: {
      display: false,
      min: 0,
      max: 105,
    },
    y: {
      display: false,
    },
  },

  plugins: {
    datalabels: {
      labels: {
        title: {
          color: "#000", // Màu sắc của nhãn
          anchor: "start", // Vị trí của nhãn so với điểm dữ liệu
          align: -45, // Căn chỉnh nhãn ở phía trên cùng của thanh

          padding: {
            left: -6,
            bottom: 10,
          },

          font: {
            size: 14,
            weight: 500,
          },
          formatter: (value: number, context: any) => {
            // Sử dụng giá trị từ mảng labels cho mỗi thanh
            return context.chart.data.labels[context.dataIndex];
          },
        },
        value: {
          color: "#000",
          anchor: "end", // Đặt nhãn ở cuối thanh để hiển thị giá trị
          align: 6, // Căn giữa nhãn với điểm dữ liệu

          padding: {
            left: -5,
          },
          font: {
            size: 15,
            weight: 500,
          },
          formatter: (value: number, context: any) => {
            // Trả về giá trị của thanh
            return `${value}%`;
          },
        },
      },
    },
    legend: {
      display: false, // Xóa legend (chú giải) của biểu đồ
    },
    title: {
      display: true,
      text: "Top mentioned topics monthly",
      align: "start",
      color: "black",
      font: {
        size: 16,
      },
      padding: {
        top: 5,
        bottom: 20,
      },
    },
  },
};
const doughnutValue = 60;
const maxValue = 100;

const gaugeChart = ref<HTMLCanvasElement | null>(null);
var pointer = {
  id: "pointer",
  defaults: {
    percentage: 0,
    maxAngle: 0,
  },
  afterDraw: function (chart: any, args: any, opt: any) {
    const width = chart.width;
    const height = chart.height;
    const ctx = chart.ctx;
    const centerX = width / 2;
    const centerY = height / 2 + 35;

    // Tính toán vị trí điểm
    const angleInDegrees = -90 - 135 + (doughnutValue / maxValue) * 270;
    const angle = (Math.PI / 180) * angleInDegrees; // Tính toán góc theo phần trăm

    const radius = 90;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.save();

    ctx.beginPath();
    ctx.lineWidth = 9;
    ctx.arc(x, y, 10, 0, 2 * Math.PI);

    ctx.fillStyle = "#fff";
    ctx.fill();

    if (doughnutValue < 20) {
      ctx.strokeStyle = "#FF0606";
    } else if (doughnutValue < 40) {
      ctx.strokeStyle = "#FF9500";
    } else if (doughnutValue < 60) {
      ctx.strokeStyle = "#F85418";
    } else if (doughnutValue < 80) {
      ctx.strokeStyle = "#00B448";
    } else {
      ctx.strokeStyle = "#0164FF";
    }

    ctx.stroke();

    ctx.restore();
  },
};
const optionsForDoughnut = {
  maintainAspectRatio: false,
  circumference: 270,
  rotation: -135,
  cutoutPercentage: 64,
  cutout: "83%",

  plugins: {
    legend: {
      display: false, // Xóa legend (chú giải) của biểu đồ
    },
    title: {
      color: "#000",
      display: true,
      text: "Tenant satisfaction",
      font: {
        size: 17,
      },
      padding: {
        top: 5,
        bottom: 20,
      },
    },
    datalabels: {
      display: false,
    },
    plugins: {
      tooltip: { enabled: false },
      pointer: { currentAngle: 1 },
    },
  },
};

onMounted(() => {
  if (gaugeChart.value) {
    const ctx = gaugeChart.value.getContext("2d");
    if (ctx) {
      ChartJS.register(ChartDataLabels);
      const canvas = ctx.canvas;
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2 // Assuming the canvas is square for simplicity
      );
      if (doughnutValue < 20) {
        gradient.addColorStop(0, "#a70400"); // Start color
        gradient.addColorStop(1, "#FF0606"); //end color
      } else if (doughnutValue < 40) {
        gradient.addColorStop(0, "#b66b00"); // Start color
        gradient.addColorStop(1, "#FF9500"); //end color
      } else if (doughnutValue < 60) {
        gradient.addColorStop(0, "#FF7E59"); // Start color
        gradient.addColorStop(1, "#e74c3c"); //end color
      } else if (doughnutValue < 80) {
        gradient.addColorStop(0, "#00B448"); // Start color
        gradient.addColorStop(1, "#007e2d"); //end color
      } else {
        gradient.addColorStop(0, "#00368a"); // Start color
        gradient.addColorStop(1, "#0164FF"); //end color
      }

      new ChartJS(ctx, {
        type: "doughnut",
        data: {
          labels: ["Red"],
          datasets: [
            {
              label: "# of Votes",
              data: [doughnutValue, maxValue - doughnutValue],

              backgroundColor: [gradient, "#E9ECF1"],
              borderRadius: 10,
            },
          ],
        },
        options: optionsForDoughnut,
        plugins: [pointer],
      });
    }
  }
});
</script>

<style scoped>
.tenant-sat-main {
  display: flex;
  margin: 0;
  width: 100%;
  height: 100%;
}
.chart1 {
  width: 50%;
  margin-left: 25px;
}
.chart1 canvas {
  width: 100% !important;
  height: 100% !important;
}
.chart2 {
  display: flex;
  justify-content: center;
  position: relative;

  flex-grow: 1;
}
.chart2 canvas {
  width: 90% !important;
  height: 90% !important;
}
.icons {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 48%;
  width: 58px;
  height: 58px;
  background: #e9ecf3;
  border-radius: 100%;
  padding-top: 5px;
}
.title {
  position: absolute;
  bottom: 2px;
}
</style>

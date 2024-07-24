<template>
  <div class="roomView">
    <div class="header">
      <div class="title">
        <div style="width: 30px; height: 30px">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="rgba(5, 101, 249, 1)"
                d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1H7zM5.002 8L5 20h10V8H5.002zM9 6h8v10h2V4H9v2zm-2 5h6v2H7v-2zm0 4h6v2H7v-2z"
              />
            </g>
          </svg>
        </div>
        <div
          style="
            font-weight: 600;
            font-size: 24px;
            color: rgba(5, 101, 249, 1);
            margin-left: 5px;
          "
        >
          Room Status Details
        </div>
      </div>
      <select disabled>
        <option value="0">December</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
      </select>
    </div>
    <div class="mid">
      <div id="mid1" style="width: 300px">
        <div class="midItems">
          <div>
            <p>Total Rooms</p>
            <div
              style="
                font-weight: 700;
                font-size: 28px;
                color: rgba(32, 34, 36, 1);
              "
            >
              {{ total }}
            </div>
          </div>
          <div class="homeIconBg" style="background: #fff3d6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0,0,256,256"
              width="26px"
              height="25px"
            >
              <g
                fill="#ff9500"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style="mix-blend-mode: normal"
              >
                <g transform="scale(5.12,5.12)">
                  <path
                    d="M24.96289,1.05469c-0.20987,0.00724 -0.41214,0.08036 -0.57812,0.20898l-23,17.94727c-0.43579,0.33978 -0.51361,0.96851 -0.17383,1.4043c0.33978,0.43579 0.96851,0.51361 1.4043,0.17383l1.38477,-1.08008v26.29102c0.00006,0.55226 0.44774,0.99994 1,1h13.83203c0.10799,0.01785 0.21818,0.01785 0.32617,0h11.67383c0.10799,0.01785 0.21818,0.01785 0.32617,0h13.8418c0.55226,-0.00006 0.99994,-0.44774 1,-1v-26.29102l1.38477,1.08008c0.2819,0.21983 0.65967,0.27257 0.991,0.13833c0.33133,-0.13423 0.56586,-0.43504 0.61526,-0.7891c0.0494,-0.35406 -0.09386,-0.70757 -0.37579,-0.92736l-7.61523,-5.94141v-7.26953h-6v2.58594l-9.38477,-7.32227c-0.18607,-0.14428 -0.41707,-0.21828 -0.65234,-0.20898zM25,3.32227l19,14.82617v26.85156h-12v-19h-14v19h-12v-26.85156zM37,8h2v3.70898l-2,-1.5625zM20,28h10v17h-10z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div class="midItems">
          <div>
            <p>Occupied Rooms</p>
            <div
              style="
                font-weight: 700;
                font-size: 20px;
                color: rgba(32, 34, 36, 1);
              "
            >
              {{ occupied }}
            </div>
          </div>
          <div
            class="homeIconBg"
            style="
              background: rgba(221, 167, 250, 1);
              width: 30px;
              height: 30px;
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0,0,256,256"
              width="26px"
              height="25px"
            >
              <g
                fill="rgba(183, 69, 244, 1)"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style="mix-blend-mode: normal"
              >
                <g transform="scale(5.12,5.12)">
                  <path
                    d="M24.96289,1.05469c-0.20987,0.00724 -0.41214,0.08036 -0.57812,0.20898l-23,17.94727c-0.43579,0.33978 -0.51361,0.96851 -0.17383,1.4043c0.33978,0.43579 0.96851,0.51361 1.4043,0.17383l1.38477,-1.08008v26.29102c0.00006,0.55226 0.44774,0.99994 1,1h13.83203c0.10799,0.01785 0.21818,0.01785 0.32617,0h11.67383c0.10799,0.01785 0.21818,0.01785 0.32617,0h13.8418c0.55226,-0.00006 0.99994,-0.44774 1,-1v-26.29102l1.38477,1.08008c0.2819,0.21983 0.65967,0.27257 0.991,0.13833c0.33133,-0.13423 0.56586,-0.43504 0.61526,-0.7891c0.0494,-0.35406 -0.09386,-0.70757 -0.37579,-0.92736l-7.61523,-5.94141v-7.26953h-6v2.58594l-9.38477,-7.32227c-0.18607,-0.14428 -0.41707,-0.21828 -0.65234,-0.20898zM25,3.32227l19,14.82617v26.85156h-12v-19h-14v19h-12v-26.85156zM37,8h2v3.70898l-2,-1.5625zM20,28h10v17h-10z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const occupied = 35;
const vancant = 10;
const reserved = 5;
const total = occupied + vancant + reserved;
</script>

<style scoped>
.roomView {
  display: flex;
  flex-direction: column;
  background: rgba(245, 246, 248, 1);
  width: 90%;
  height: 95%;
  padding: 5px 20px 10px 20px;
  border-radius: 12px;
}
.header {
  width: 100%;
  position: relative;
}
.title {
  display: flex;
}
.header select {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 119px;
  height: 37px;
  border-radius: 12px;
}
.header select:disabled {
  background: #dddddd;
}
.mid {
  display: flex;
  justify-content: space-between;
}
.midItems {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: white;
  border-radius: 12px;
  padding: 10px;
}
.midItems p {
  font-weight: 600;
  font-size: 16px;
  color: rgb(90, 89, 89);
}
.homeIconBg {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 22px;
}
</style>

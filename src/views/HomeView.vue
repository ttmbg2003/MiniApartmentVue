<template>
  <div class="home">
    <div id="btop1"></div>
    <div id="btop2"></div>
    <div
      style="
        display: flex;
        flex-direction: column;
        margin-top: 90px;
        width: 100%;
      "
    >
      <div class="mainView">
        <div style="width: 557px; margin-top: 100px">
          <p style="font-weight: 700; font-size: 48px">
            Your Home, Our Priority
          </p>
          <p style="font-weight: 500; font-size: 24px">
            We prioritize caring for your home and creating an ideal living
            space.
          </p>
        </div>
        <img
          style="margin-left: -10px; width: 700px; height: auto"
          src="/src/components/icons/Group 26753.png"
        />
      </div>

      <div class="pagination">
        <div class="text">
          <div
            style="
              font-size: 36px;
              font-weight: 500;
              color: #2196f3;
              margin-top: -20px;
            "
          >
            Convenient & Efficient
          </div>
          <p style="font-size: 18px">
            Managers can easily record income,......
          </p>
          <div
            style="
              width: 147.02px;
              height: 6px;
              background: #2196f3;
              border-radius: 5px;
            "
          ></div>
        </div>
        <div class="text">
          <div style="font-size: 36px; font-weight: 500; margin-top: -20px">
            Enhanced Comfort
          </div>
          <p style="font-weight: 400; font-size: 18px">
            Helps create a safe, clean, and convenient living environment,...
          </p>
        </div>
        <div class="text" style="border: none">
          <div style="font-weight: 500; font-size: 36px; margin-top: -20px">
            Cost Optimization
          </div>
          <p>
            automates management processes such as payments, maintenance, and
            cost allocation. This reduces human errors and optimizes operational
            costs, ensuring efficient use of resources.
          </p>
        </div>
      </div>

      <div id="aboutUs" class="aboutUs">
        <img
          style="margin-left: -80px"
          src="/src/components/icons/aboutUs.png"
        />
        <div style="margin-left: 130px">
          <p style="font-size: 28px; font-weight: 500">Hello,</p>
          <p style="font-size: 18px; font-weight: 400">
            Welcome to [Company Name], a leading provider of management
            solutions for mini condominiums. Established with a mission to
            redefine residential management, we specialize in delivering
            seamless living experiences tailored to the needs of modern urban
            dwellers. Our approach is guided by a commitment to professionalism,
            efficiency, and community enhancement.
          </p>
          <div style="display: flex">
            <div class="aboutData">
              <div style="font-weight: 700; font-size: 48px">+200</div>
              <div
                style="
                  height: 11.5px;
                  width: 70px;
                  background: #2196f3;
                  border-radius: 5px;
                  margin-top: 25px;
                "
              ></div>
              <div style="font-size: 24px; font-weight: 500; margin-top: 20px">
                EMPLOYEE
              </div>
            </div>
            <div class="aboutData">
              <div style="font-weight: 700; font-size: 48px">+50</div>
              <div
                style="
                  height: 11.5px;
                  width: 70px;
                  background: #2196f3;
                  border-radius: 5px;
                  margin-top: 25px;
                "
              ></div>
              <div style="font-size: 24px; font-weight: 500; margin-top: 20px">
                PROJECT
              </div>
            </div>
            <div class="aboutData">
              <div style="font-weight: 700; font-size: 48px">+1000</div>
              <div
                style="
                  height: 11.5px;
                  width: 70px;
                  background: #2196f3;
                  border-radius: 5px;
                  margin-top: 25px;
                "
              ></div>
              <div style="font-size: 24px; font-weight: 500; margin-top: 20px">
                CLIENTS
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="info">
        <div class="news">
          <div style="position: absolute; bottom: 10px; right: 30%">
            <button id="slideBtn" @click="scrollLeft">
              <font-awesome-icon
                class="faIcon"
                :icon="['fas', 'arrow-left']"
                style="color: rgba(5, 101, 249, 1); width: 20px; height: 20px"
              />
            </button>
            <button id="slideBtn" @click="scrollRight">
              <font-awesome-icon
                class="faIcon"
                :icon="['fas', 'arrow-right']"
                style="color: rgba(5, 101, 249, 1); width: 20px; height: 20px"
              />
            </button>
          </div>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              width: 470px;
              height: 470px;
              background: white;
              transform: rotate(45deg);
              border-radius: 100px;
              position: absolute;
              right: -50px;
              z-index: 0;
            "
          >
            <img
              style="transform: rotate(-45deg)"
              src="/src/components/icons/blueman.png"
            />
          </div>
          <div
            style="
              position: absolute;
              border: 50px solid rgba(183, 223, 255, 1);
              width: 700px;
              height: 700px;
              transform: rotate(45deg);
              right: -260px;
              border-radius: 100px;
              z-index: -1;
            "
          ></div>
          <div class="infor">
            <p
              style="
                font-weight: 700;
                font-size: 52px;
                color: rgba(5, 101, 249, 1);
                margin-left: 40px;
              "
            >
              Information & News
            </p>
            <div id="infoList">
              <div class="iList">
                <div class="infoItems">
                  <img src="/src/components/icons/shakeHand.png" />
                  <div class="content">
                    <div style="margin-top: 35px">
                      Pellentesque ac bibendum tortor, vel blandit nulla. Nulla
                      eget lobortis lacus. Eu aliquam nibh tempus at
                    </div>
                    <button class="detailBtn">SEE DETAIL</button>
                  </div>
                  <div class="itemBg"></div>
                </div>
                <div class="infoItems">
                  <img src="/src/components/icons/Connectivity01.png" />
                  <div class="content">
                    <div style="margin-top: 35px">
                      Pellentesque ac bibendum tortor, vel blandit nulla. Nulla
                      eget lobortis lacus. Eu aliquam nibh tempus at
                    </div>
                    <button class="detailBtn">SEE DETAIL</button>
                  </div>
                  <div class="itemBg"></div>
                </div>
                <div class="infoItems">
                  <img src="/src/components/icons/Wallet.png" />
                  <div class="content">
                    <div style="margin-top: 35px">
                      Pellentesque ac bibendum tortor, vel blandit nulla. Nulla
                      eget lobortis lacus. Eu aliquam nibh tempus at
                    </div>
                    <button class="detailBtn">SEE DETAIL</button>
                  </div>
                  <div class="itemBg"></div>
                </div>
                <div class="infoItems">
                  <img src="/src/components/icons/mailbox.png" />
                  <div class="content">
                    <div style="margin-top: 35px">
                      Pellentesque ac bibendum tortor, vel blandit nulla. Nulla
                      eget lobortis lacus. Eu aliquam nibh tempus at
                    </div>
                    <button class="detailBtn">SEE DETAIL</button>
                  </div>
                  <div class="itemBg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div id="footer">
          <div style="width: 263px; margin-top: 10px">
            <img
              style="width: 155px; height: 50px"
              src="/src/components/icons/TheNiceHouseLogo.png"
            />
            <p style="margin: 20px 0 20px 0">
              Nam posuere accumsan porta. Integer id orci sed ante tincidunt
              tincidunt sit amet sed libero.
            </p>
            <p>© Skyrev Theme 2020</p>
          </div>
          <div id="foot2">
            <div
              style="
                font-weight: 700;
                font-size: 18px;
                color: rgba(13, 71, 161, 1);
                margin-bottom: 20px;
              "
            >
              ABOUT US
            </div>
            <ul style="list-style: none; padding: 0">
              <li><p>Donec dignissim</p></li>
              <li><p>Donec dignissim</p></li>
              <li><p>Donec dignissim</p></li>
              <li><p>Donec dignissim</p></li>
            </ul>
          </div>
          <div id="foot3">
            <div
              style="
                font-weight: 700;
                font-size: 18px;
                color: rgba(13, 71, 161, 1);
                margin-bottom: 20px;
              "
            >
              INFORMATION
            </div>
            <ul style="list-style: none; padding: 0">
              <li><p>Recruitment</p></li>
              <li><p>Safety & Security</p></li>
              <li><p>Payment</p></li>
              <li><p>Community</p></li>
              <li><p>Others</p></li>
            </ul>
          </div>
          <div id="foot4">
            <div
              style="
                font-weight: 700;
                font-size: 18px;
                color: rgba(13, 71, 161, 1);
                margin-bottom: 20px;
              "
            >
              CONTACT US
            </div>
            <div>
              <p>Company Headquarters:</p>
              <ul style="padding: 0; padding-left: 30px">
                <li>
                  <p>
                    Add: 456 Oak Street, Suite 101, City Center, ABC Town, XYZ
                    Country
                  </p>
                </li>
                <li><p>Phone: +123 456 7890</p></li>
                <li><p>Email: info@xyzproperty.com</p></li>
              </ul>
              <p>Apartment Address:</p>
              <ul style="padding: 0; padding-left: 30px">
                <li>
                  <p>
                    Add: 789 Avenue, Unit 201, City Center, ABC Town, XYZ
                    Country
                  </p>
                </li>
                <li><p>Tel: +123 789 0123</p></li>
                <li><p>Email: thenicehouse@greenvalley.com</p></li>
              </ul>
              <img
                style="
                  margin-left: 10px;

                  width: 188px;
                  height: 31px;
                "
                src="/src/components/icons/Socmed.png"
              />
              <select style="margin-left: 200px; height: 31px">
                <option value="0">English-En</option>
                <option value="1">Vietnam-Vi</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
function scrollRight() {
  document.getElementById("infoList")!.scrollLeft += 100;
}
function scrollLeft() {
  document.getElementById("infoList")!.scrollLeft -= 100;
}
document.querySelector("#aboutLink")?.addEventListener("click", () => {
  const element = document.getElementById("aboutUs");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
});
document.querySelector("#contactLink")?.addEventListener("click", () => {
  const element = document.getElementById("footer");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
});
document.querySelector("#infoLink")?.addEventListener("click", () => {
  const element = document.getElementById("info");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
});
</script>
<style scoped>
.home {
  position: relative;
  top: -90px;
  z-index: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;

  background-color: white;
}
#btop1 {
  position: absolute;
  width: 1054px;
  height: 993px;
  top: -450px;
  right: -400px;
  background: #e8f6ff;
  border-radius: 200px;
  transform: rotate(133.72deg);
  z-index: 1;
}
#btop2 {
  position: absolute;
  width: 1044.79px;
  height: 981.29px;
  top: -410px;
  right: -400px;
  background: #eff8ff;
  border-radius: 200px;
  transform: rotate(133.72deg);
  z-index: 0;
}
.mainView {
  display: flex;
  z-index: 1;
  margin: auto;
  margin-top: 80px;
  margin-bottom: 70px;
  width: 90%;
}
.pagination {
  display: flex;
  z-index: 1;
  margin: auto;
  margin-bottom: 50px;
  width: 90%;
}
.pagination .text {
  flex-grow: 1;
  width: 355px;
  height: 63px;
  border-right: 1px solid #0000001f;
  padding-left: 15px;
}
.aboutUs {
  display: flex;
  align-items: center;
  margin: auto;
  width: 90%;
}
.aboutUs .aboutData {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  flex-grow: 1;
}
.news {
  background-color: rgba(187, 222, 251, 0.2);
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
}
.scrollbar-flex-content {
  display: flex;
  width: 200px;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}

#infoList {
  width: 900px;

  overflow-x: scroll;

  scrollbar-width: none;
}
.infoItems {
  position: relative;
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 260px;
  height: 400px;
  background: transparent;
  margin-right: 10px;

  padding: 22px;
  padding-top: 0;
  z-index: 1;
}
.infoItems .content {
  display: flex;
  flex-direction: column;
  padding: 0 22px 0 22px;
  position: absolute;
  width: 100%;
  bottom: 20px;
}

.itemBg {
  position: absolute;
  bottom: 0;
  width: 260px;
  height: 350px;
  background: white;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #d6d6d6;
  z-index: -1;
}
.iList {
  display: inline-flex;
  padding-left: 10px;
  padding-bottom: 20px;
}
#slideBtn {
  background-color: transparent; /* Makes the background transparent */
  border: none; /* Removes the border */
  cursor: pointer; /* Changes the cursor to a pointer to indicate it's clickable */
  --icon-color: rgba(5, 101, 249, 1); /* Custom property for icon color */
}

#slideBtn:hover .faIcon {
  color: rgb(2, 56, 135);
}
.detailBtn {
  font-size: 16px;
  width: 217px;
  height: 39px;
  color: rgba(5, 101, 249, 1);
  border: 1px solid rgba(5, 101, 249, 1);
  background: transparent;
  margin-top: 40px;
  border-radius: 7px;
}

#footer {
  display: flex;
  justify-content: space-between;

  padding: 30px 30px 0 80px;
  margin-top: 90px;
  background-image: url("/src/components/icons/footer.png");
  height: 300px;
}
#footer p {
  font-weight: 400;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.54);
}
#foot4 p {
  margin: 0;
}
</style>

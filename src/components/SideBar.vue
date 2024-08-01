<template>
  <div class="side-bar">
    <div style="margin-top: 3rem">
      <div class="background-icon-apartment-manage">
        <i class="icon-apartment-manage"
          ><img
            style="width: 30px"
            src="../components/icons/apartmentManagementIcon.png"
        /></i>
        <h5>Apartment Management</h5>
      </div>
      <div style="text-align: center">
        <ul style="list-style-type: none">
          <li class="li-side-bar">
            <i
              ><img
                src="../components/icons/TenantIcon.png"
                style="width: 24px" /></i
            ><router-link to="/tenants" class="a-side-bar" active-class="active"
              >Tenant</router-link
            >
          </li>
          <li class="li-side-bar">
            <i
              ><img
                src="../components/icons/ContractIcon.png"
                style="width: 24px" /></i
            ><router-link
              class="a-side-bar"
              to="/ListOfContract"
              active-class="active"
              >Contract</router-link
            >
          </li>
          <li class="li-side-bar">
            <i
              ><img
                src="../components/icons/paymentIcon.png"
                style="width: 24px" /></i
            ><router-link to="/payment" class="a-side-bar" active-class="active"
              >Payment</router-link
            >
          </li>
          <li class="li-side-bar">
            <i
              ><img
                src="../components/icons/graph-chart.png"
                style="width: 24px" /></i
            ><router-link to="/report" class="a-side-bar" active-class="active"
              >Report</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
.side-bar {
  background: white;
  font-family: "Poppins", sans-serif;
  /* padding-right: 8rem; */
  margin-right: 20px;
}

.background-icon-apartment-manage {
  background-color: #0565f9;
  color: white;
  padding: 6px;
  border-radius: 14px;
  margin-left: 11%;
  margin-right: 25px;
  display: flex;
  padding-bottom: 1px;
}

.icon-apartment-manage {
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 4px;
}

.a-side-bar {
  text-decoration: none;
  color: black;
  margin-left: 10px;
}

.li-side-bar {
  margin: 20px;
  font-size: 20px;
  display: flex;
}
.active {
  color: blue;
}
</style>

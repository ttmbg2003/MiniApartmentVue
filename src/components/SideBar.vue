<template>
    <div class="side-bar">
    
        <div style="margin-top: 3rem;">
    
            <div class="background-icon-apartment-manage">
    
                <i class="icon-apartment-manage"><img style="    width: 30px;"
    
                            src="../components/icons/apartmentManagementIcon.png"></i>
    
                <h5>Apartment Management</h5>
    
            </div>
    
            <div style="text-align: center;">
    
                <ul style="list-style-type: none;margin-left: 20px;">
    
                    <li class="li-side-bar"><i><img src="../components/icons/TenantIcon.png"></i><a class="a-side-bar" href="#">Tenant</a></li>
    
                    <li class="li-side-bar"><i><img src="../components/icons/ContractIcon.png"></i><a class="a-side-bar" href="/ListOfContract">Contract</a></li>
    
                    <li class="li-side-bar"><i><img src="../components/icons/paymentIcon.png"></i><a class="a-side-bar" href="#">Payment</a></li>
    
                </ul>
    
            </div>
    
        </div>
    
    </div>
</template>
<style scoped>
.side-bar {
    background: white;
    margin-top: 20px;
    /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25); */
    font-family: 'Poppins', sans-serif;
    padding-right: 8rem;
    margin-right: 27px;
}

.background-icon-apartment-manage {
    background-color: #0565F9;
    color: white;
    padding: 6px;
    border-radius: 14px;
    margin-left: 24%;
    margin-right: -30%;
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
</style>
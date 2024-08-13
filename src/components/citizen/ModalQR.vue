<template>
    <div class="modal-body">
        <div style="    display: flex;justify-content: center;">
            <img style="width: 60%;" src="../icons/HanaBank.png">
        </div>
        <div>
            <img>
        </div>
        <div>
            <p>Please scan the QR code and enter the transfer details clearly to complete the payment.</p>
            <p>Syntax: Payment for rent of [room number], [apartment name] for [month]. [year]</p>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-cancel" data-bs-toggle="modal" data-bs-target="#viewExpensesDetailModal">
            Cancel
        </button>
        <button type="submit" class="btn btn-save">
            Done
        </button>
    </div>
</template>
<style scoped>
.btn {
    border-radius: 8px;
    border: none;
    margin: 10px 8px;
    cursor: pointer;
}

.btn-save {
    background-color: #0565f9;
    color: white;
    width: 79px;
}

.btn-cancel {
    background-color: #e8e7e7;
}
.modal-footer{
    justify-content: center;
    padding: 0;
}
</style>
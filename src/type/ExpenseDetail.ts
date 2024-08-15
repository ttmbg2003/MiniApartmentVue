export interface Expenses{
    roomId:number,
    year:string,
    month:number,
    rentalFee:number,
    electricPreviousMeter:number,
    electricCurrentMeter:number,
    waterPreviousMeter:number,
    waterCurrentMeter:number,
    debt:number,
    fine:number,
    status:string,
    internet:number,
    service:number,
    securityDeposite:number,
    createDate: Date,
    dueDate:Date
}
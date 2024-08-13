import type { IListPayment } from "@/type/IListPayment";
import apiClient from "@/utils/apiClient";

class PaymentService{
    getListPaymentByYear = (year:number): Promise<any> => {
        return apiClient
          .get(`/api/payment/getPaymentByYear?year=${year}`)
          .then((response) => response.data['result']);
      };
    getListPaymentByYearAndROom = (year:number,roomId:number): Promise<any> => {
        return apiClient
          .get(`/api/payment/getPaymentByYearAndRoom?year=${year}&roomId=${roomId}`)
          .then((response) => response.data['result']);
      };
    // getTenantByRoomId = (roomId:number): Promise<IListPayment> => {
    //     return apiClient.post(`/api/tenants/getTenantByRoomId?roomId=${roomId}`)
    //     .then((response) => response.data);
    // }
    getListPaymentCitizenByYearAndRoom = (year:number): Promise<any> => {
      return apiClient
        .get(`/api/payment_citizen/getPaymentByYearAndRoom?year=${year}`)
        .then((response) => response.data);
    };
    getPaymentQrURL= (year:any, month:number, roomId:number) : Promise<any> =>{
      return apiClient.post("/api/payment_citizen/getPaymentQR",{
        year,
        month,
        roomId
      }).then((res) => res.data['result'])
    }
    checkPay= (year:any, month:number, roomId:number) : Promise<any> =>{
      return apiClient.post("/api/payment_citizen/checkPay",{
        year,
        month,
        roomId
      }).then((res) => res.data['result'])
    }
}
export default new PaymentService();
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
}
export default new PaymentService();
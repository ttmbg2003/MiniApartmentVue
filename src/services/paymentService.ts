import type { IListPayment } from "@/type/IListPayment";
import apiClient from "@/utils/apiClient";

class PaymentService{
    getListPaymentByYear = (year:number): Promise<IListPayment[]> => {
        return apiClient
          .get(`/api/payment/getPaymentByYear?year=${year}`)
          .then((response) => response.data);
      };
    getTenantByRoomId = (roomId:number): Promise<IListPayment> => {
        return apiClient.post(`/api/tenants/getTenantByRoomId?roomId=${roomId}`)
        .then((response) => response.data);
    }
}
export default new PaymentService();
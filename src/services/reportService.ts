import apiClient from "@/utils/apiClient";

class ReportService {
  getTotalRooms = (): Promise<any> => {
    return apiClient
      .get("/api/room/roomCount")
      .then((res) => res.data["result"]);
  };
  getRoomByStatus = async (month: number, year: number): Promise<any> => {
    const response = await apiClient.get(
      `/api/roomStatus/countRoomByStatus?month=${month}&year=${year}`
    );
    return response.data["result"];
  };
  getRoomDetailList = async (month: number, year: number): Promise<any> => {
    const response = await apiClient.get(
      `/api/roomStatus/getRoomDetail?month=${month}&year=${year}`
    );
    return response.data["result"];
  };
  getTenantByMonths = (): Promise<any> => {
    return apiClient
      .get("/contract/countTenantsEachMonth")
      .then((res) => res.data["result"]);
  };
  getRoomTenantThisMonth = (currentMonth: number): Promise<any> => {
    return apiClient
      .get(`/contract/getRoomTenantThisMonth?currentMonth=${currentMonth}`)
      .then((res) => res.data["result"]);
  };
  getOntimePaymentMonths = (): Promise<any> => {
    return apiClient
      .get("/api/payment/getOnTimePaymentMonths")
      .then((res) => res.data["result"]);
  };
  getPaymentStatusRoom = (month: number): Promise<any> => {
    return apiClient
      .get(`/api/payment/getPaymentStatusRoom?month=${month}`)
      .then((res) => res.data["result"]);
  };
  getTotaltenant = (month: number): Promise<any> => {
    return apiClient
      .get(`/contract/tenantCount?month=${month}`)
      .then((res) => res.data["result"]);
  };
}

export default new ReportService();

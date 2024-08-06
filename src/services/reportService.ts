import apiClient from "@/utils/apiClient";

class ReportService {
  getTotalRooms = (): Promise<any> => {
    return apiClient
      .get("/api/room/roomCount")
      .then((res) => res.data["result"]);
  };
  getRoomByStatus = (): Promise<any> => {
    return apiClient
      .get(`/api/room/countRoomByStatus`)
      .then((res) => res.data["result"]);
  };
  getRoomDetailList = (): Promise<any> => {
    return apiClient
      .get("/api/room/getRoomDetail")
      .then((res) => res.data["result"]);
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
}

export default new ReportService();

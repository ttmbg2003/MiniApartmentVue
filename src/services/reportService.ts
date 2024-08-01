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
}

export default new ReportService();

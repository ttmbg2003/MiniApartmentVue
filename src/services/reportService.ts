import apiClient from "@/utils/apiClient";

class ReportService {
  getRoomStatus = (): Promise<any> => {
    return apiClient
      .get("/api/room/roomCount")
      .then((res) => res.data["result"]);
  };
}

export default new ReportService();

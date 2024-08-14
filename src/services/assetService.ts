import apiClient from "@/utils/apiClient";

class AssetService {
  getRoomByTime = (month: number, year: number): Promise<any> => {
    return apiClient
      .get(`/asset/getAssetRoom?month=${month}&year=${year}`)
      .then((res) => res.data["result"]);
  };
  getAssetDetailEachRoom = (
    roomId: number,
    month: number,
    year: number
  ): Promise<any> => {
    return apiClient
      .get(
        `/asset/getAssetDetailByRoom?roomId=${roomId}&month=${month}&year=${year}`
      )
      .then((res) => res.data["result"]);
  };
}
export default new AssetService();

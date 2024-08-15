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

  updateAssetDetail = (
    id: number,
    maintCycle: number,
    maintDate: string,
    maintStatus: string
  ): Promise<any> => {
    return apiClient
      .post(
        `/asset/updateAssetMaintenance?id=${id}&maintCycle=${maintCycle}&maintDate=${maintDate}&maintStatus=${maintStatus}`
      )
      .then((res) => res.data["status"]);
  };

  deleteAssetItem = (id: number): Promise<any> => {
    return apiClient
      .delete(`/asset/deleteAssetItem?id=${id}`)
      .then((res) => res.data["status"]);
  };
}
export default new AssetService();

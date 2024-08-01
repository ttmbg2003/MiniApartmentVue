import type { Room } from "@/type/Room";
import apiClient from "@/utils/apiClient";

class RoomService {
  getAllRoomAvailable = async (): Promise<any> => {
    const response = await apiClient.get(`/api/room/getRoomAvailable`);
    return response.data["result"];
  };
  getAllRoom = async (): Promise<any> => {
    const response = await apiClient.get(`/api/room/getAllRoom`);
    return response.data["result"];
  };
}
export default new RoomService();

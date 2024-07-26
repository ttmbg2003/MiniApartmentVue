import type { Room } from "@/type/Room";
import apiClient from "@/utils/apiClient";

class RoomService{
    getAllRoomAvailable = (): Promise<any> => {    
        return apiClient
          .get(`/api/room/getRoomAvailable`)
          .then((response) => response.data['result']);
      };
    getAllRoom = (): Promise<any> => {
      return apiClient.get(`/api/room/getAllRoom`)
              .then((response) => response.data['result'])
    }
    // deleteTenant = (email:any): Promise<any> => {
    //     return apiClient
    //         .delete(`/api/tenants/deleteTenant?email=${email}`)
    //         .then((response) => response.data);
    // };
    // getTenantByRoomId = (roomId:number): Promise<any> => {
    //     return apiClient.post(`/api/tenants/getTenantByRoomId?roomId=${roomId}`)
    //     .then((response) => response.data['result']);
    // }
    // updateTenant = (tenantList:Tenant[]) : Promise<void> =>{
    //     return apiClient.post("/api/tenants/updateTenants",tenantList)
    //     .then((response) => response.data['result']);
    // }
}
export default new RoomService();
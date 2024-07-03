import type { Tenant } from "@/type/Tenant";
import apiClient from "@/utils/apiClient";

class TenantService{
    getAllTenant = (): Promise<Tenant[]> => {
        return apiClient
          .get("/api/tenants/getAllTenant")
          .then((response) => response.data);
      };
    deleteTenant = (email:any): Promise<String> => {
        return apiClient
            .delete(`/api/tenants/deleteTenant?email=${email}`)
            .then((response) => response.data);
    };
    getTenantByRoomId = (roomId:number): Promise<Tenant> => {
        return apiClient.post(`/api/tenants/getTenantByRoomId?roomId=${roomId}`)
        .then((response) => response.data);
    }
}
export default new TenantService();
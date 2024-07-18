import type { Tenant } from "@/type/Tenant";
import apiClient from "@/utils/apiClient";

class TenantService{
    getAllTenant = (pageNo:number,keySearch:string): Promise<any> => {
        if (pageNo == null) {
            pageNo = 0;
        }        
        return apiClient
          .get(`/api/tenants/getAllTenant?pageNo=${pageNo}&keySearch=${keySearch}`)
          .then((response) => response.data['result']);
      };
    deleteTenant = (email:any): Promise<any> => {
        return apiClient
            .delete(`/api/tenants/deleteTenant?email=${email}`)
            .then((response) => response.data);
    };
    getTenantByRoomId = (roomId:number): Promise<any> => {
        return apiClient.post(`/api/tenants/getTenantByRoomId?roomId=${roomId}`)
        .then((response) => response.data['result']);
    }
    updateTenant = (tenantList:Tenant[]) : Promise<void> =>{
        return apiClient.post("/api/tenants/updateTenants",tenantList)
        .then(() => {});
    }
    // searchTenant = (key:string) :Promise<any> =>{
    //     return apiClient.post(`/api/tenants/search?keySearch=${key}`)
    //     .then((response)=>response.data['result']);
    // }
}
export default new TenantService();
import type { Tenant } from "@/type/Tenant";
import apiClient from "@/utils/apiClient";

class TenantService{
    getAllTenant = (): Promise<Tenant[]> => {
        return apiClient
          .get("/api/tenants/getAllTenant")
          .then((response) => response.data);
      };
      
}
export default new TenantService();
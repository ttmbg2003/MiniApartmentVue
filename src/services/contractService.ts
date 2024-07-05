import type { Contract } from "@/type/Contract";
import apiClient from "@/utils/apiClient";

class ContractService {
  getAllContract = (): Promise<Contract[]> => {
    return apiClient
      .get("/contract/getAllContract")
      .then((response) => response.data);
  };
  
  getContractByContractId = (contractId: number): Promise<Contract> => {
    return apiClient
      .get(`contract/getContractByContractId/${contractId}`)
      .then((response) => response.data);
  };
}
export default new ContractService();

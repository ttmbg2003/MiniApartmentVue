import type { Contract } from "@/type/Contract";
import apiClient from "@/utils/apiClient";

class ContractService {
  getAllContract = (): Promise<Contract[]> => {
    return apiClient
      .get("/contract/getAllContract")
      .then((response) => response.data);
  };
  deleteContract = (contractId: any): Promise<String> => {
    return apiClient
      .delete(`contract/deleteContract?contractId=${contractId}`)
      .then((response) => response.data);
  };
  getContractByContractId = (contractId: number): Promise<Contract> => {
    return apiClient
      .post(`contract/getContractByContractId?ContractId=${contractId}`)
      .then((response) => response.data);
  };
}
export default new ContractService();

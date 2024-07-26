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
  updateContractStatus = (contractId: number, contractStatus: number): Promise<Contract> => {
    return apiClient
    .put(`/contract/updateStatus/${contractId}/${contractStatus}`)
    .then((response) => response.data);
  };
  updateContract = (contractId: number) : Promise<Contract> => {
    return apiClient
    .put(`/contract/updateContract/${contractId}`)
    .then((response) => response.data);
  }
  getRepesentativeByRoomId = (roomId:any) : any =>{
    return apiClient.get(`/contract/getRepesentative?roomId=${roomId}`)
    .then((response) => response.data['result'])
  }
}
export default new ContractService();

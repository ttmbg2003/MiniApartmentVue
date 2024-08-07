import type { Contract } from "@/type/Contract";
import apiClient from "@/utils/apiClient";

class ContractService {
  getAllContract = (pageNo: number, keySearch: string): Promise<any> => {
    if (pageNo == null) {
      pageNo = 0;
    }
    return apiClient
      .get(`/contract/getAllContract?pageNo=${pageNo}&keySearch=${keySearch}`)
      .then((response) => response.data["result"]);
  };
  getContractByRoom = (roomId: number): Promise<Contract> => {
    return apiClient
      .get(`contract/getContractByRoom/${roomId}`)
      .then((response) => response.data);
  };
  getContractByContractId = (contractId: string): Promise<any> => {
    return apiClient
      .get(`contract/getContractByContractId?contractId=${contractId}`)
      .then((response) => response.data["result"]);
  };
  getContractById = (id: number): Promise<any> => {
    return apiClient
      .get(`contract/findContractById?id=${id}`)
      .then((response) => response.data["result"]);
  };
  updateContractStatus = (
    contractId: number,
    contractStatus: number
  ): Promise<Contract> => {
    return apiClient
      .put(`/contract/updateStatus/${contractId}/${contractStatus}`)
      .then((response) => response.data);
  };
  updateContract = (
    roomId: number,
    updateContractDTO: Contract
  ): Promise<Contract> => {
    return apiClient
      .put(`/contract/updateContract?id=${roomId}`, updateContractDTO)
      .then((response) => response.data["result"])
      .catch((error) => {
        console.error("Error updating contract:", error);
        throw error;
      });
  };
  getRepesentativeByRoomId = (roomId: any, month: any): any => {
    return apiClient
      .get(`/contract/getRepesentative?roomId=${roomId}&month=${month}`)
      .then((response) => response.data["result"]);
  };
}
export default new ContractService();

export interface ContractDetail {
  id: number;
  contractId: string;
  totalArea: number;
  landArea: number;
  publicArea: number;
  privateArea: number;
  device: string;
  ownerOrigin: string;
  ownerLimit: string;
  rights: string;
  obligations: string;
  commit: string;
  copies: number;
  dated: Date;
  placeOfCitizenId: string;
}

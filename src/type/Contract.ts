export interface Contract {
  contractId: number;
  roomId: number;
  numberOfTenant: number;
  rentalFee: number;
  securityDeposite: number;
  paymentCycle: number;
  contract: string;
  signinDate: string;
  moveinDate: string;
  expireDate: string;
  contractStatus: number;
  representative: string;
}

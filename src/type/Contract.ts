export interface Contract {
  contractId: number;
  numberOfTenants: number;
  rentalFee: number;
  securityDeposite: number;
  paymentCycle: number;
  singinDate: string;
  moveinDate: string;
  expireDate: string;
  contractStatus: number;
}

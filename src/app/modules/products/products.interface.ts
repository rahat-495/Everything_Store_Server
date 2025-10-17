
export interface TPaymentMethod {
  bkash ?: boolean ;
  nagat ?: boolean ;
  CashOnDelivery ?: boolean ;
}

export interface TProduct {
  image: string;
  title: string;
  description: string;
  shortDescription : string ;
  price: number;
  previousPrice?: number; 
  discount?: number; 
  inStock : boolean;
  quantity : number;
  category : string;
  deliveryFee : number;
  paymentMethod : TPaymentMethod ;
  // here promotion setup -------------------------
}

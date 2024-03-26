type ProductTyps = "RESTAURANT" | "HOTEL" | "FLIGHT"


export default class Product {
  totalPrice: number;
  constructor(
    public type: ProductTyps,
    public date: string,
    public price: number,
    public quantity: number
  ) {
    this.totalPrice = price * quantity;
  }
}

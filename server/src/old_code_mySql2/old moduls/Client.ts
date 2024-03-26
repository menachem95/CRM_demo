import User from "./User";

interface OrderInterface {}

export default class Client extends User {
  constructor(name: string, email: string, phone: string) {
    super(name, email, phone, "CLIENT");
  }
  order() {}
  
}

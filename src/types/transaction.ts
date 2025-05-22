import { Package } from "./package";
import { IResponse } from "./response";
import { Users } from "./user";

export interface Transaction {
    id:           number;
    user_id:      number;
    package_id:   number;
    invoice:      string;
    name:         string;
    email:        string;
    phone_number: string;
    price:        number;
    admin_price:  number;
    price_total:  number;
    invoice_url:  string;
    expiry_date:  string;
    rawJson:      string;
    status:       string;
    created_at:   string;
    updated_at:   string;
    user :Users,
    package:Package
}

export interface IGetTransaction extends IResponse {
    data: {
      items: Transaction;
    };
  }
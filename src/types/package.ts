export interface Package {
    id:          number;
    name:        string;
    name_desc:   string;
    icon:        string;
    slug:        string;
    description: any;
    price:       number;
    promo_price: number;
    admin_price: number;
    created_at:  string;
    updated_at:  string;
}
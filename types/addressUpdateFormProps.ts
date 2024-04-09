
export interface AddressData {
    address1: string;
    address2: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    province_code: string;
    country_code: string;
    country_name: string;
  }
  
  export interface AddressUpdateFormProps {
    customerId: string;
    addressId?: string;
  }
  
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Typography } from '@mui/joy'; 
import Header from '../components/header'; 
import { Main } from '../components/layout'; 
import AddressUpdateForm from '../components/addressUpdateForm';

interface Customer {
  id: string; 
  name: string;
  phone: string | null;
  address: {
    id: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    province_code: string;
    country_code: string;
    country_name: string;
  } | null;
}

const SingleShopifyCustomer = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const router = useRouter();
  const { customerId } = router.query;

  useEffect(() => {
    if (typeof customerId === 'string') {
      const fetchCustomer = async () => {
        try {
          const response = await axios.get(`/api/customers?customerId=${customerId}`);
        //   const response = await axios.get(`/api/address/route?customerId=${customerId}`);
          setCustomer(response.data); // Adjust based on your actual response structure
        } catch (error) {
          console.error('Error fetching customer:', error);
        }
      };

      fetchCustomer();
    }
  }, [customerId]);

  return (
    <div>
      <Header title="Shopify Customer Details" />
      <Main>
        {customer ? (
          <>
            <Typography>{customer.name}</Typography>
            <Typography level="body-xs">Phone: {customer.phone}</Typography>
            {customer.address && (
              <Typography level="body-xs">
                Address: {`${customer.address.address1}, ${customer.address.city}, ${customer.address.province}, ${customer.address.country}, ${customer.address.zip}`}
              </Typography>
            )}
            <div>
            <AddressUpdateForm 
                customerId={customerId.toString()} 
                addressId={customer?.address?.id || ''} />
            </div>
          </>
        ) : (
          <Typography>Loading customer details...</Typography>
        )}
      </Main>
    </div>
  );
};

export default SingleShopifyCustomer;


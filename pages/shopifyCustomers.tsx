import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Sheet, Typography } from '@mui/joy';
import Header from './components/header'; 
import Layout from './components/layout'; 
import Link from 'next/link';

interface Customer {
  id: string; 
  name: string;
  phone: string | null;
  addresses: {
    full_address: string | null;
  }[];
}

const ShopifyCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // const response = await axios.get('/api/phoneno');
        const response = await axios.get('/api/addresses/route');
        setCustomers(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="m-2 rounded-3xl bg-white p-2 md:m-10 md:p-10">
      <Header title="Shopify Customers" />
      <Layout.Main>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {customers.map((customer, index) => (
            <Sheet
              key={index} 
              component="li"
              variant="outlined"
              sx={{ borderRadius: 'sm', p: 2, listStyle: 'none' }}
            >
              <Link href={`/customers/${customer.id}`} legacyBehavior>
                <a style={{ textDecoration: 'none', color: 'inherit' }}> 
                  <Typography level="title-md">{customer.name}</Typography>
                  {/* <Typography level="body-xs">Customer ID: {customer.id}</Typography> */}
                  <Typography level="body-xs">Phone: {customer.phone}</Typography>
                  {customer.addresses && customer.addresses.map((address, addrIndex) => (
                    <Typography key={addrIndex} level="body-xs">Address: {address.full_address}</Typography>
                  ))}
                </a>
              </Link>
            </Sheet>
          ))}
        </List>
      </Layout.Main>
    </div>
  );
};

export default ShopifyCustomers;

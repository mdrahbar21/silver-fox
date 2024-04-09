import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Sheet, Typography } from '@mui/joy';
import Header from './components/header'; 
import Layout from './components/layout'; 
import Link from 'next/link';

interface LineItem {
    name: string;
    productId: string; 
  }
  
  interface Order {
    orderId: string;
    customerId: string;
    customerName: string;
    customerPhone: string | null;
    line_items: LineItem[]; 
  }
  

const ShopifyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const response = await axios.get('/api/orders');
        const response = await axios.get('/api/orders/route');
        setOrders(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="m-2 rounded-3xl bg-white p-2 md:m-10 md:p-10">
      <Header title="Shopify Orders" />
      <Layout.Main>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {orders.map((order, index) => (
            <Sheet
              key={index} 
              component="li"
              variant="outlined"
              sx={{ borderRadius: 'sm', p: 2, listStyle: 'none' }}
            >
                <Link href={`/orders/${order.orderId}`} legacyBehavior>
                <a style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography level="title-md">Customer Phone: {order.customerPhone}</Typography>
                    <Typography level="body-xs">Order ID: {order.orderId}</Typography>
                    {/* <Typography level="body-xs">Customer ID: {order.customerId}</Typography> */}
                    <Typography level="body-xs">Customer Name: {order.customerName}</Typography>
                    <Typography level="body-xs">Line Items:</Typography>
                    <ul style={{ paddingLeft: '20px' }}>
                        {order.line_items.map((item, idx) => (
                        <li key={idx}>
                            <Typography level="body-xs">{item.name}</Typography>
                            <Typography level="body-xs">Product ID: {item.productId}</Typography>
                        </li>
                        ))}
                    </ul>
                </a>
                </Link>
            </Sheet>
          ))}
        </List>
      </Layout.Main>
    </div>
  );
};

export default ShopifyOrders;

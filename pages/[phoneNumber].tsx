import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { List, Sheet, Typography } from '@mui/joy';
import Header from '../components/header';
import { Main } from '../components/layout';

export interface LineItem {
    product_id: string;
    name: string;
  }
  
  export interface Order {
    id: string;
    customer_name: string;
    phone: string;
    default_address: string; 
    billing_address: string; 
    line_items: LineItem[];
  }
  
  
  const CustomerOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const router = useRouter();
    const { phoneNumber } = router.query;
  
    useEffect(() => {
      if (!phoneNumber) return;
      const fetchOrders = async () => {
        try {
          const response = await axios.post('/api/addresses/orders/route', { phoneNumber });
          setOrders(Array.isArray(response.data.orders) ? response.data.orders : []);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
  
      fetchOrders();
    }, [phoneNumber]);
  
    return (
      <div className="m-2 rounded-3xl bg-white p-2 md:m-10 md:p-10">
        <Header title="Customer Orders" />
        <Main>
          {orders.length > 0 ? (
            <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {orders.map((order, index) => (
                <Sheet
                  key={index}
                  component="li"
                  variant="outlined"
                  sx={{ borderRadius: 'sm', p: 2, listStyle: 'none' }}
                >
                  <Typography level="title-md">Order ID: {order.id}</Typography>
                  <Typography level="body-xs">Customer: {order.customer_name}</Typography>
                  <Typography level="body-xs">Order Phone: {order.phone}</Typography>
                  <Typography level="body-xs">Default Address: {order.default_address}</Typography>
                  <Typography level="body-xs">Billing Address: {order.billing_address}</Typography>
                  {order.line_items.map((item, itemIndex) => (
                    <Typography key={itemIndex} level="body-xs">Product: {item.name}</Typography>
                  ))}
                </Sheet>
              ))}
            </List>
          ) : (
            <Typography level="body-md">No orders found for this phone number.</Typography>
          )}
        </Main>
      </div>
    );
  };
  
  export default CustomerOrders;
  
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Typography, Button } from '@mui/joy';
import Header from '../../components/header';
import {Main} from '../../components/layout';

interface LineItem {
  name: string;
  product_id: string;
}

interface OrderDetails {
  orderId: string;
  name: string;
  total_price: string;
  fulfillment_status: string;
  financial_status: string;
  line_items: LineItem[];
}

const OrderDetailsPage = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    if (typeof orderId === 'string') {
      const fetchOrderDetails = async () => {
        try {
        //   const response = await axios.get(`/api/singleOrder?orderId=${orderId}`);
          const response = await axios.get(`/api/order/route?orderId=${orderId}`);
          setOrderDetails(response.data.order); 
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      };

      fetchOrderDetails();
    }
  }, [orderId]);

  const cancelOrder = async () => {
    if (typeof orderId === 'string') {
      try {
        // await axios.post('/api/cancelOrder', { orderId });
        await axios.post('/api/order/cancel/route', { orderId });
        alert('Order cancelled successfully');
        router.push('/shopifyOrders');
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel order'); 
      }
    }
  };

  return (
    <div>
      <Header title="Shopify Order Details" />
      <Main>
        {orderDetails ? (
          <>
            <Typography level="h4">Order: {orderDetails.name}</Typography>
            <Typography level="body-xs">Total Price: {orderDetails.total_price}</Typography>
            <Typography level="body-xs">Fulfillment Status: {orderDetails?.fulfillment_status  || "null"} </Typography>
            <Typography level="body-xs">Financial Status: {orderDetails.financial_status}</Typography>
            <Typography level="body-xs">Line Items:</Typography>
            {orderDetails.line_items.map((item, index) => (
              <Typography key={index} level="body-xs">- {item.name} (Product ID: {item.product_id})</Typography>
            ))}

            <Button onClick={cancelOrder}>Cancel Order</Button>
          </>
        ) : (
          <Typography>Loading order details...</Typography>
        )}
      </Main>
    </div>
  );
};

export default OrderDetailsPage;

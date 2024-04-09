import React from 'react';
import Link from 'next/link';
import { CssVarsProvider, Typography, Container, Box, Button, List, ListItem } from '@mui/joy';

const DocumentationPage = () => {
  return (
    <CssVarsProvider>
      <Container sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 4,
      }}>
        <Box sx={{ width: '100%', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography level="h1" sx={{ marginBottom: 2 }}>
            Documentation
          </Typography>
          <Link href="/" passHref>
            <Button variant="outlined">Back to Home</Button>
          </Link>
        </Box>

        {/* Introduction */}
        <Box sx={{ width: '100%' }}>
          {/* Project Overview */}
          <Typography level="h2" sx={{ marginBottom: 1 }}>Overview</Typography>
          <Typography component="div" level="body-md" sx={{ marginBottom: 2 }}>
            This project integrates with the Shopify API to manage customer addresses, retrieve customer orders, and cancel specific orders. It's built with Next.js, TypeScript, and Joy-UI for a modern, responsive user experience.
          </Typography>

            {/* Shopify Store Info */}
            <Typography level="h3" sx={{ marginBottom: 1 }}>Shopify Store</Typography>
            <Typography component="div" level="body-sm" sx={{ marginBottom: 2 }}>
                Store Link: <a href="https://hoomanlab.myshopify.com/" target="_blank" rel="noreferrer">Shopify</a>
            </Typography>
            <Typography component="div" level="body-sm" sx={{ marginBottom: 2 }}>
                Store Password: asdfgh
            </Typography>
            {/* APIs Documentation */}
            <Typography level="h2" sx={{ marginBottom: 1 }}>APIs</Typography>
          
              <Typography level="h4">Retrieve List of Saved Addresses</Typography>
              <List component="ul" marker='circle' sx={{ marginBottom: 2 }}>
                <ListItem><strong>Endpoint:</strong> /api/addresses/route</ListItem> 
                <ListItem><strong>Method:</strong> GET</ListItem>
                <ListItem><strong>Description:</strong> Fetches a list of saved addresses for all Shopify customers</ListItem>
                {/* <ListItem><strong>Parameters: </strong> phone_number, customerId, addressId, name, address</ListItem> */}
              </List>
              <Typography level="h4">Update Address</Typography>
              <List component="ul" marker='circle' sx={{ marginBottom: 2 }}>
                <ListItem><strong>Endpoint:</strong> /api/address/update/route</ListItem> 
                <ListItem><strong>Method:</strong> PUT</ListItem>
                <ListItem><strong>Description:</strong> Updates the address for a specific customer and sets it as the default.</ListItem>
                <ListItem><strong>Parameters: </strong> customerId, addressId</ListItem>
                <ListItem><strong>Payload: </strong> JSON object containing address details such as address1, city, province, country, zip, etc.</ListItem>
              </List>
              <Typography level="h4">All Order List</Typography>
              <List component="ul" marker='circle' sx={{ marginBottom: 2 }}>
                <ListItem><strong>Endpoint:</strong> /api/orders/route</ListItem> 
                <ListItem><strong>Method:</strong> GET</ListItem>
                <ListItem><strong>Description:</strong> Retrieve the list of orders associated with the Shopify customer</ListItem>
              </List>
              <Typography level="h4">Specific Order Detail</Typography>
              <List component="ul" marker='circle' sx={{ marginBottom: 2 }}>
                <ListItem><strong>Endpoint:</strong> /api/order/route</ListItem> 
                <ListItem><strong>Method:</strong> GET</ListItem>
                <ListItem><strong>Description:</strong> Fetch the order status and details of the products for the specified order</ListItem>
                <ListItem><strong>Parameters: </strong> orderId</ListItem>
              </List>
              <Typography level="h4">Cancel Specific Order</Typography>
              <List component="ul" marker='circle' sx={{ marginBottom: 2 }}>
                <ListItem><strong>Note:</strong>Only works if the order is not paid and not fulfilled</ListItem> 
                <ListItem><strong>Endpoint:</strong> /api/order/cancel/route</ListItem> 
                <ListItem><strong>Method:</strong> POST</ListItem>
                <ListItem><strong>Description:</strong>Cancel the specified order and confirm the successful cancellation.</ListItem>
                <ListItem><strong>Parameters: </strong> orderId</ListItem>
              </List>          

          {/* Pages Documentation */}
            <Typography level="h2" sx={{ marginBottom: 1 }}>Pages</Typography>
            <Typography level="h4">Shopify Customers</Typography>
              <List component="ul" marker='circle' sx={{ marginBottom: 2 }}>
                <ListItem><strong>Path:</strong>/shopifyCustomers</ListItem> 
                <ListItem><strong>Description:</strong>Displays a list of all Shopify customers</ListItem>
              </List>  
            <Typography level="h4">Details of Specific Shopify Customer</Typography>
              <List component="ul" marker='circle' sx={{ marginBottom: 2 }}>
                <ListItem><strong>Path:</strong>/customers/:customerId</ListItem> 
                <ListItem><strong>Description:</strong>Displays details of a specific Shopify customer and also allows to <strong>update address</strong> of that customer</ListItem>
              </List>  
            <Typography level="h4">Shopify Orders</Typography>
              <List component="ul" marker='circle' sx={{ marginBottom: 2 }}>
                <ListItem><strong>Path:</strong>/shopifyOrders</ListItem> 
                <ListItem><strong>Description:</strong>Displays list of all store orders</ListItem>
              </List>  
            <Typography level="h4">Specific Shopify Orders</Typography>
              <List component="ul" marker='circle' sx={{ marginBottom: 2 }}>
                <ListItem><strong>Path:</strong>/orders/:orderId</ListItem> 
                <ListItem><strong>Description:</strong>Displays details of a specific order and also allows to <strong>cancel</strong> the Order</ListItem>
              </List>  
            <Typography level="h4">Home</Typography>
              <List component="ul" marker='circle' sx={{ marginBottom: 2 }}>
                <ListItem><strong>Path:</strong>/</ListItem> 
                <ListItem><strong>Description:</strong>The landing page of the project, providing navigation to different tasks and documentation</ListItem>
              </List>  
            <Typography level="h4">Documentation</Typography>
              <List component="ul" marker='circle' sx={{ marginBottom: 2 }}>
                <ListItem><strong>Path:</strong>/documentation</ListItem> 
                <ListItem><strong>Description:</strong>Contains detailed documentation and guides for using the project functionalities.</ListItem>
              </List>  

          
        </Box>
      </Container>
    </CssVarsProvider>
  );
};

export default DocumentationPage;

import React from 'react';
import Link from 'next/link';
import { CssVarsProvider, Typography, Container, Card, CardContent, CardActions, Button } from '@mui/joy';

type PageData = {
  id: number;
  title: string;
  description: string;
  link: string;
  buttontext: string;
};

const pages: PageData[] = [
  {
    id: 1,
    title: "Task 1: Shopify Customer Addresses",
    description: "Retrieve the list of saved addresses for the Shopify customer ",
    link: "/shopifyCustomers",
    buttontext: "Visit Page",
  },
  {
    id: 2,
    title: "Task 2: Update Customer Address",
    description: "Click on any customer on the next page to update their address.",
    link: "/shopifyCustomers",
    buttontext: "Read Description",
  },
  {
    id: 3,
    title: "Task 3",
    description: "Get Order List.",
    link: "/shopifyOrders",
    buttontext: "Visit Page",
  },
  {
    id: 4,
    title: "Task 4 and 5",
    description: "Click on any order to view its details and cancel",
    link: "/shopifyOrders",
    buttontext: "Read Description",
  },
];



const HomePage = () => {
  return (
    <CssVarsProvider>
      <Container sx={{
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed', 
        padding: 4,
      }}>
        <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <Typography level="h1" sx={{ mt: 4, mb: 2 }}>
            Welcome to Our Project
          </Typography>
          <Link href="/documentation" passHref>
            <Button>Documentation</Button>
          </Link>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px', width: '100%' }}>
          {pages.map(({ id, title, description, link, buttontext }) => (
            <Card key={id} variant="outlined">
              <CardContent>
                <Typography level="h2" sx={{ fontSize: 'md', fontWeight: 'lg' }}>
                  {title}
                </Typography>
                <Typography level="body-sm">{description}</Typography>
              </CardContent>
              <CardActions>
                <Link href={link} passHref>
                  <Button fullWidth>
                    {buttontext}
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </div>
      </Container>
    </CssVarsProvider>
  );
};

export default HomePage;
import axios from 'axios';

export default async function handler(req, res) {
  // Extract order ID from the query parameters
  const { orderId } = req.query;

  // Validate orderId presence
  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  // Shopify API credentials and URL setup
  const shopUrl = 'https://hoomanlab.myshopify.com';
  const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  const fields = 'id,line_items,name,total_price,fulfillment_status,financial_status'; // Fields to retrieve from Shopify

  try {
    // Construct Shopify API URL for fetching a single order
    const shopifyApiUrl = `${shopUrl}/admin/api/2024-04/orders/${orderId}.json?fields=${fields}`;
    
    // Make a GET request to Shopify API
    const response = await axios.get(shopifyApiUrl, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    });

    // Respond with data retrieved from Shopify
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching order from Shopify:', error);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch order data' });
  }
}

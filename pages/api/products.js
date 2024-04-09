import axios from 'axios';

export default async function handler(req, res) {
  if (!req.query.productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  const productId = req.query.productId;
  const fields = 'id,line_items,name,total_price'; 

  const shopUrl = 'https://yourshopname.myshopify.com';
  const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN; 

  try {
    const { data } = await axios.get(`${shopUrl}/admin/api/2024-04/orders/${productId}.json?fields=${fields}`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
}

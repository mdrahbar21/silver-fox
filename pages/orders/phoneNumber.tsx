import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button } from '@mui/material';

const IndexPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Redirect to the dynamic route
    router.push(`/${phoneNumber}`);
  };

  return (
    <div style={{ margin: '20px' }}>
        <h2>Enter Phone Number</h2>
        <p>Enter a phone number with country code to view the customer's orders </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TextField
          label="Phone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default IndexPage;

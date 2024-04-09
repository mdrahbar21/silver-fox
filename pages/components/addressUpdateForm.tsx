import React, { useState } from 'react';
import axios from 'axios'; 
import { AddressData, AddressUpdateFormProps } from './addressUpdateFormProps';

const AddressUpdateForm: React.FC<AddressUpdateFormProps> = ({ customerId, addressId }) => {
  const [addressData, setAddressData] = useState<AddressData>({
    address1: '',
    address2: '',
    city: '',
    province: '',
    country: '',
    zip: '',
    province_code: '',
    country_code: '',
    country_name: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError('');

    try {
      // const response = await axios.put(`/api/updateAddress?customerId=${customerId}&addressId=${addressId}`, addressData);
      const response = await axios.put(`/api/address/update/route?customerId=${customerId}&addressId=${addressId}`, addressData);
      
      // Logging and alerting success
      console.log(response.data);
      alert('Address updated successfully!');
    } catch (error) {
      console.error('Error updating address:', error);
      setSubmissionError('Error updating address. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        {/* ... */}
        <input
          name="address1"
          placeholder="Address Line 1"
          value={addressData.address1}
          onChange={handleChange}
        />
        <input
          name="address2"
          placeholder="Address Line 2"
          value={addressData.address2}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="city"
          value={addressData.city}
          onChange={handleChange}
        />
        <input
          name="province"
          placeholder="province"
          value={addressData.province}
          onChange={handleChange}
        />
        <input
          name="country"
          placeholder="country"
          value={addressData.country}
          onChange={handleChange}
        />
        <input
          name="zip"
          placeholder="zip"
          value={addressData.zip}
          onChange={handleChange}
        />
        <button type="submit" disabled={isSubmitting}>Update Address</button>
      </form>
      {submissionError && <p style={{ color: 'red' }}>{submissionError}</p>}
    </div>
  );
};

export default AddressUpdateForm;

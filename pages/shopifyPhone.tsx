import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnDirective, ColumnsDirective, Resize, Sort, Selection, Search, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Toolbar } from '@syncfusion/ej2-react-grids';
import Header from '../components/header';

interface Customer {
    name: string;
    phone: string | null;
    addresses: {
      full_address: string | null;
    }[];
  }
const Employees = () => {
  const [customers, setCustomers] = useState([]);

useEffect(() => {
    const fetchCustomers = async () => {
        // const response = await fetch('/api/phoneno');
        const response = await fetch('/api/addresses/route');
        const data = await response.json();
        const processedData = data.map((customer: Customer) => ({
            ...customer,
            fullAddresses: customer.addresses.map(a => a.full_address).filter(a => a).join(", "),
        }));
        setCustomers(processedData);
    };

    fetchCustomers();
}, []);
  

  const columns = [
    { field: 'name', headerText: 'Full Name', width: '300', textAlign: 'Center' },
    { field: 'phone', headerText: 'Phone', width: '150', textAlign: 'Center' },
    { field: 'fullAddresses', headerText: 'Address', width: '300', textAlign: 'Center' },
  ];

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header title='Shopify Customers' />
      <GridComponent
        dataSource={customers}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width='auto'
        editSettings={{ allowEditing: true, allowDeleting: true }}
      >
        <ColumnsDirective>
          {columns.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
}

export default Employees;

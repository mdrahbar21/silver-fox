import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className='mb-10'>
      <h2 className='text-3xl font-extrabold tracking-light text-slate-900'>
        {title}
      </h2>
    </div>
  );
}

export default Header;

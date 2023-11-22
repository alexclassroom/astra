import React from 'react';
import Breadcrumbs from './Breadcrumbs';

const Header = () => {

  return (
    <div className='ast-tb-header'>
        <div className='ast-tb-header-items'>
            { /** Astra Icon */}
            <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='40' height='40' rx='20' fill='url(#paint0_linear_6786_60902)'/><path d='M19.7688 8.00063C19.7679 7.99979 19.7688 7.99979 19.7688 8.00063C16.5122 14.6651 13.2557 21.333 10 27.9975C11.3949 27.9975 12.7907 27.9975 14.1865 27.9975C16.8208 22.8376 19.4568 17.6759 22.0919 12.5126L19.7688 8.00063Z' fill='white'/><path d='M24.1092 16.2694C22.7652 18.976 21.4213 21.6833 20.0774 24.3899L19.9996 24.5408H20.0774C21.3695 24.5408 22.6615 24.5408 23.9536 24.5408C24.4704 25.6933 24.9873 26.8475 25.5041 28C27.0027 28 28.5014 28 30 28C28.0364 24.0881 26.0719 20.1788 24.1092 16.2694Z' fill='white'/><defs><linearGradient id='paint0_linear_6786_60902' x1='-5.96046e-07' y1='40' x2='47.0588' y2='28.2353' gradientUnits='userSpaceOnUse'><stop stopColor='#492CDD'/><stop offset='1' stopColor='#AD38E2'/></linearGradient></defs></svg>

            { /** Heading */}
            <h2 className='ast-tb-main-title'>{ astra_theme_builder.title }</h2>

            {/** Breadcrumbs */}
            <Breadcrumbs />
        </div>
        <div className='ast-tb-header-close' onClick={() => window.location.href = astra_theme_builder.admin_url }>
          <div>
            {/** Close Icon */}
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6 18L18 6M6 6L18 18' stroke='#475569' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg>
          </div>
        </div>
    </div>
  );
}

export default Header;

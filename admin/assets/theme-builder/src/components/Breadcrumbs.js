import React from 'react';
import { __ } from "@wordpress/i18n";

const Breadcrumbs = () => {
  
  let currCrumb = [__( 'Dashboard', 'astra' ), __( 'Site Builder', 'astra' )];

  return (
    <nav className='ast-tb-breadcrumbs'>
      {currCrumb.map((item, index) => (
        <span className='ast-tb-crumb' key={index}>
          {item}
          {index < currCrumb.length - 1 &&
            <span className='ast-tb-crumb-icon'>
							<svg
								width="14"
								height="14"
								viewBox="0 0 14 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
                className="ast-tb-breadcrumb-icon"
							>
								<path
									d="M4.90625 10.2734L8.17578 7.0039L4.90625 3.73438"
									stroke="#4B5563"
									strokeWidth="1.08984"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
            </span>
          }
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
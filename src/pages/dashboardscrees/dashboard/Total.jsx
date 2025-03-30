import React from 'react';
import { Icons } from '../../../icons';

const Total = () => {
  return (
    <div className="total-main">
      {/* First box */}
      <div className="box-container-total">
        <span>
          <span className="total-value">5420</span> <br />
          <span className="total-value-text">Total User</span>
        </span>
        <span className="total-icon">
          <Icons.totalusers size={30} />
        </span>
      </div>

      {/* Second box */}
      <div className="box-container-total">
        <span>
          <span className="total-value">1250</span> <br />
          <span className="total-value-text">Total Trainer</span>
        </span>
        <span className="total-icon">
          <Icons.trainer_icon size={30} />
        </span>
      </div>

      {/* Third box */}
      <div className="box-container-total">
        <span>
          <span className="total-value">5420</span> <br />
          <span className="total-value-text">Total Posts</span>
        </span>
        <span className="total-icon">
          <Icons.posts_icon size={30} />
        </span>
      </div>

      {/* Fourth box */}
      {/* <div className="box-container-total">
        <span>
          <span className="total-value">4400</span> <br />
          <span className="total-value-text">Total Sales</span>
        </span>
        <span className="total-icon">
          <Icons.totalSale size={30} />
        </span>
      </div> */}

      {/* Fifth box */}
      {/* <div className="box-container-total">
        <span>
          <span className="total-value">1200</span> <br />
          <span className="total-value-text">Total Company</span>
        </span>
        <span className="total-icon">
          <Icons.totalcompany size={30} />
        </span>
      </div> */}
    </div>
  );
};

export default Total;

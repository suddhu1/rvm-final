import React from "react";
import "../styles/voucherStyle.css"; // Import voucher specific styles

const VoucherCard = ({ pointsRequired, amount }) => {
  return (
    <div className="voucher-card">
      <h3 className="voucher-title">Redeem for ₹{amount}</h3>
      <p className="voucher-points">Requires {pointsRequired} points</p>
      <button className="voucher-btn">Redeem Now</button>
    </div>
  );
};

const Vouchers = () => {
  // Define vouchers data
  const vouchers = [
    { pointsRequired: 50, amount: 25 },
    { pointsRequired: 100, amount: 50 },
    { pointsRequired: 200, amount: 100 },
    { pointsRequired: 500, amount: 250 },
    { pointsRequired: 1000, amount: 500 },
    { pointsRequired: 2000, amount: 1000 },
    { pointsRequired: 5000, amount: 2500 },
    { pointsRequired: 10000, amount: 5000 },
    { pointsRequired: 20000, amount: 10000 },
  ];

  return (
    <>
      <h2 className="hello">Redeem Your Points</h2>
      <div className="voucher-container">
        <div className="vouchers-grid">
          {vouchers.map((voucher, index) => (
            <VoucherCard
              key={index}
              pointsRequired={voucher.pointsRequired}
              amount={voucher.amount}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Vouchers;

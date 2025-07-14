import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountHistory.css";
<img src="/images/N1.webp" alt="notebook" />// adjust path as needed
  
  const orders = [
    {
      id: "ORD123456",
      product: {
        name: "U Style Notebook",
        image: "/images/N1.webp",
        eco_rating: 5,
        price: "$4.49",
      },
      orderDate: "2024-06-01",
      status: "Delivered",
      deliveryDate: "2024-06-05",
      rewardPoints: 15,
    },
    // Add more orders as needed
  ];
  
  const Sidebar = () => (
    <aside className="account-sidebar">
      <div className="sidebar-section">
        <h3>Account</h3>
        <p className="tagline">Save more. Live better.</p>
        <a className="sidebar-link active" href="#">Track your order</a>
      </div>
      <div className="sidebar-section">
        <h4>My items</h4>
        <a className="sidebar-link" href="#">Reorder</a>
        <a className="sidebar-link" href="#">Lists</a>
        <a className="sidebar-link" href="#">Registries</a>
      </div>
      <div className="sidebar-section">
        <h4>Privacy</h4>
        <a className="sidebar-link" href="#">Privacy Policy</a>
      </div>
    </aside>
  );
  
  const OrderCard = ({ order }) => {
    const navigate = useNavigate();
    return (
      <div className="order-card">
        <div className="order-img">
          <img src={order.product.image} alt={order.product.name} />
        </div>
        <div className="order-details">
          <h3>{order.product.name}</h3>
          <div className="eco-rating">
            {Array(order.product.eco_rating).fill("🌱").join("")}
            <span className="eco-label">Eco Rating: {order.product.eco_rating}/5</span>
          </div>
          <div className="order-info">
            <span><b>Order #:</b> {order.id}</span>
            <span><b>Order Date:</b> {order.orderDate}</span>
            <span><b>Status:</b> {order.status}</span>
            <span><b>Delivered:</b> {order.deliveryDate}</span>
            <span><b>Reward Points:</b> {order.rewardPoints}</span>
          </div>
          <div className="order-price">
            <span className="price">{order.product.price}</span>
            <button className="details-btn">Return/Exchange</button>
            <button className="details-btn" onClick={() => navigate('/recycle')}>Recycle</button>
          </div>
        </div>
      </div>
    );
  };
  
  const AccountHistory = () => (
    <>
      <div className="account-history-container">
        <Sidebar />
        <main className="account-main">
          <h2>Order History</h2>
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </main>
      </div>
    </>
  );
  
  export default AccountHistory;





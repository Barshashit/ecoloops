import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="feedback-section">
        <p>We’d love to hear what you think!</p>
        <button>Give feedback</button>
      </div>

      <div className="links-section">
        <a href="#">All Departments</a>
        <a href="#">Store Directory</a>
        <a href="#">Careers</a> 
        <a href="#">Our Company</a>
        <a href="#">Sell on Walmart.com</a>
        <a href="#">Help</a>
        <a href="#">Product Recalls</a>
        <a href="#">Accessibility</a>
        <a href="#">Tax Exempt Program</a>
        <a href="#">Get the Walmart App</a>
        <a href="#">Privacy Notice</a>
        <a href="#">AdChoices</a>
        <a href="#">Delete Account</a>
        {/* Add others as needed */}
      </div>

      <div className="copyright">
        © 2025 Walmart. The trademarks Walmart and the Walmart Spark design are registered...
      </div>
    </footer>
  );
}

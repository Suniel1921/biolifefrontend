import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
            <div className="footer-container">
                <div className="footer-section">
                    <h2 className="footer-logo">BioLife</h2>
                    <p>Professionally redefine transparent ROI through low-risk high-yield imperatives. Progressively create empowered, cost effective users via team driven.</p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#"><i className="fab fa-whatsapp"></i></a>
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Help & FAQs</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p><i className="fas fa-phone-alt"></i> 977 980-8800-0393</p>
                    <p><i className="fas fa-envelope"></i> info@biolife.com</p>
                    <p><i className="fas fa-map-marker-alt"></i>Khumaltar,Lalitpur,Nepal</p>
                </div>
                <div className="footer-section">
                    <h3>Get in Touch!</h3>
                    <p>Subscribe to our upcoming latest article and news resources. Sign up today for hints, tips and the latest product news.</p>
                    <form>
                        <input type="email" placeholder="Enter email address" />
                        {/* <button type="submit"><i className="fas fa-paper-plane"></i></button> */}
                    </form>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyright © 2024 BilLife. All Rights Reserved.</p>
                <p>Powered By Nepal Tech</p>
                <div className="footer-links">
                    <a href="#">Terms & Condition</a>
                    <a href="#">Careers</a>
                    <a href="#">Privacy Policy</a>
                </div>
            </div>
            </div>
        </footer>
    );
}

export default Footer;

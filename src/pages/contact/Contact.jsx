import React from 'react'
import '../contact/contact.css';

const Contact = () => {
  return (
    <>
    <div className="contact">
      <div className="container">
        <div className="contactContainer">
          <div className="leftContact">
            <h3>Contact Information</h3>
            <p>Fill the form below or write us .We will help you as soon as possible.</p>
            <div className="contactCard">
              <div className="childCard phoneCard">
                <h3>Phone</h3>
                <p>+977 98000000</p>
              </div>
              <div className="childCard emailCard">
                <h3>email</h3>
                <p>info@biolife.com</p>
              </div>
              <div className="childCard addressCard">
                <h3>address</h3>
                <p>Khumaltar,Lalitpur,Nepal</p>
                <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7068.34045308742!2d85.31971200716178!3d27.650204591375115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb17000477c865%3A0xc8d8ea8f33bee317!2sNepal%20Tech%20Innovations%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1720763628219!5m2!1sen!2snp"></iframe>
              </div>
            </div>
          </div>
          <div className="rightContact">
            <form className='contactForm'>
              <h3>Get in Touch</h3>
              <input type="text" name="name" placeholder='Name'/>
              <input type="email" name="email" placeholder='Email'/>
              <input type="number" name="number" id="" placeholder='Number'/>
              <textarea name="message" id="" placeholder='Message'/>
              <button className='contactBtn'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default Contact

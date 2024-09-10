import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './homeSlider.css';

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false, // Hide arrows on smaller screens
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="homeSliderContainer">
      <Slider {...settings}>
        <div className="sliderItem">
          <img src="/images/slider6.jpg" alt="Watch 3" />
        </div>
        <div className="sliderItem">
          <img src="/images/slide2.png" alt="Watch 2" />
        </div>
        <div className="sliderItem">
          <img src="/images/slide04.jpg" alt="Watch 3" />
        </div>
        <div className="sliderItem">
          <img src="/images/slide5.png" alt="Watch 3" />
        </div>
      </Slider>
    </div>
  );
};

export default HomeSlider;

import React from 'react';
import Slider from 'react-slick';

import './style.scss';

const settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 10000,
};

export default ({ children, ...props }) => {
  return (
    <Slider {...settings} {...props}>
      {children}
    </Slider>
  );
};

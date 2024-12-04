import React, { ReactElement } from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface CarouselProps {
  children: ReactElement | ReactElement[];
}

// thin wrapper around the Carousel package to make it easier for future refactoring
const Carousel: React.FC<CarouselProps> = ({ children, ...rest }) => {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <ReactCarousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      {...rest}
    >
      {childrenArray}
    </ReactCarousel>
  );
};

export default Carousel;

import { AppImage } from "@/providers/store/services/types/common";
import Carousel from "./Carousel";

interface ImagesCarouselProps {
  images: AppImage[];
}

const ImagesCarousel = ({ images = [] }: ImagesCarouselProps) => {
  return (
    <Carousel>
      {images.length > 0 ? (
        images.map(({ publicId, imageUrl }) => (
          <img src={imageUrl} key={publicId} alt="product-preview" />
        ))
      ) : (
        <img src="/images/product.png" alt="product-preview" />
      )}
    </Carousel>
  );
};

export default ImagesCarousel;

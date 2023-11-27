import { ImageGalleryItem } from 'components/ImageItem/ImageItem';
import { ImageList } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => (
  <ImageList>
    {images.map(imageItem => (
      <ImageGalleryItem imageItem={imageItem} key={imageItem.id} />
    ))}
  </ImageList>
);

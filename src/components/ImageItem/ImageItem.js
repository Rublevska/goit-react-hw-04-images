import { useState } from 'react';
import { ImageElement, PictureItem } from './ImageItem.styled';
import { ImageModal } from 'components/Modal/ImageModal';

export const ImageGalleryItem = ({ imageItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ImageElement key={imageItem.id}>
      <PictureItem
        onClick={openModal}
        src={imageItem.webformatURL}
        alt={imageItem.tags}
      />

      <ImageModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        largeImageURL={imageItem.largeImageURL}
        tags={imageItem.tags}
      />
    </ImageElement>
  );
};

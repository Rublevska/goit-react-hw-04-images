import { Component } from 'react';
import { ImageElement, PictureItem } from './ImageItem.styled';
import { ImageModal } from 'components/Modal/ImageModal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { isModalOpen } = this.state;
    const { imageItem } = this.props;
    return (
      <ImageElement key={imageItem.id}>
        <PictureItem
          onClick={this.openModal}
          src={imageItem.webformatURL}
          alt={imageItem.tags}
        />

        <ImageModal
          isModalOpen={isModalOpen}
          closeModal={this.closeModal}
          largeImageURL={imageItem.largeImageURL}
          tags={imageItem.tags}
        />
      </ImageElement>
    );
  }
}

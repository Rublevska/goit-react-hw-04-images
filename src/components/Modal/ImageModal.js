import Modal from 'react-modal';
import { ModalPicture } from './ImageModal.styled';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'calc(100vw - 48px)',
    maxHeight: 'calc(100vh - 24px)',
  },
};

Modal.setAppElement('#root');

export const ImageModal = ({
  isModalOpen,
  closeModal,
  largeImageURL,
  tags,
}) => (
  <Modal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Image modal"
  >
    <ModalPicture src={largeImageURL} alt={tags}></ModalPicture>
  </Modal>
);

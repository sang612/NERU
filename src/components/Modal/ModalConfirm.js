import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export default function ModalConfirm({ isOpen, setIsOpen, handleOk, message, title }) {
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
        <div>{title}</div>
        <div>{message}</div>
        <button onClick={() => handleOk()}>Đồng ý</button>
        <button onClick={closeModal}>Huỷ</button>
      </Modal>
    </div>
  );
}

import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '450px',
    display: 'flex',
    flexDirection: 'column',
  },
};
export default function ModalConfirm({ isOpen, setIsOpen, handleOk, message, title }) {
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
        <div className="font-black my-3 text-xl">{title}</div>
        <div className="my-3">{message}</div>
        <div className="flex px-2">
          <button
            className="bg-primary w-1/3 text-white h-12 mx-2 my-4 rounded-md flex justify-center items-center"
            onClick={handleOk}
          >
            同意
          </button>
          <button
            className="w-1/3 h-12 text-white rounded-md my-4 bg-secondary cursor-pointer flex justify-center items-center"
            onClick={closeModal}
          >
            キャンセル
          </button>
        </div>
      </Modal>
    </div>
  );
}

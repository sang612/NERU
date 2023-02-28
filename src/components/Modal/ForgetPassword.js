import { useEffect, useRef } from 'react';
import { Input } from '../Input';

export const ModalForgetPassword = ({ action, activeItem, setActiveItem, setEmailForgetPassword }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setActiveItem();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex bg-[#0004] z-50">
      <div
        className="m-auto w-80 xsm:w-96 min-h-[224px] bg-white flex flex-col z-20 rounded-xl justify-center"
        ref={modalRef}
      >
        <div className="w-full px-6 pt-4 text-start flex">
          <Input placeholder="メールアドレス" onChange={(e) => setEmailForgetPassword(e.target.value)} />
        </div>
        <div className="flex justify-evenly items-center text-white pt-2 pb-4">
          <div
            className="w-1/3 h-12 rounded-md bg-error cursor-pointer flex justify-center items-center"
            onClick={() => action(activeItem.id)}
          >
            メールを送る
          </div>
        </div>
      </div>
    </div>
  );
};

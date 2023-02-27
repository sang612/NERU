import { useEffect, useRef } from 'react';

const ModalDeleted = ({ action, activeItem, setActiveItem }) => {
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
      <div className="m-auto w-80 xsm:w-96 min-h-[224px] bg-white flex flex-col z-20 rounded-xl" ref={modalRef}>
        <div className="w-full px-10 text-center text-lg py-2 border-b-2 border-stone-200">{`削除しても宜しいでしょうか？`}</div>
        <div className="w-full px-6 py-4 text-start flex-1">
          {activeItem.data.map((d) => (
            <div className="w-full h-7 leading-[28px] text-sm truncate" key={d.label}>{`${d.label}: ${d.value}`}</div>
          ))}
        </div>
        <div className="flex justify-evenly items-center text-white pt-2 pb-4">
          <div
            className="w-1/3 h-12 rounded-md bg-secondary cursor-pointer flex justify-center items-center"
            onClick={() => setActiveItem()}
          >
            いいえ
          </div>
          <div
            className="w-1/3 h-12 rounded-md bg-error cursor-pointer flex justify-center items-center"
            onClick={() => action(activeItem.id)}
          >
            はい
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleted;

const Pagination = ({ currentPage, lastPage, setCurrentPage, total }) => {
  const setFirstPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };
  const setPrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((prev) => --prev);
    }
  };
  const setNextPage = () => {
    if (currentPage !== lastPage) {
      setCurrentPage((prev) => ++prev);
    }
  };
  const setLastPage = () => {
    if (currentPage !== lastPage) {
      setCurrentPage(lastPage);
    }
  };
  const setPage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-full flex h-14">
      <div className="w-1/3 flex justify-start items-center pl-3">
        {!lastPage
          ? 'データがありません'
          : currentPage === lastPage
          ? `${(currentPage - 1) * 10 + 1} - ${total} / ${total}`
          : `${currentPage * 10 - 9} - ${currentPage * 10} / ${total}`}
      </div>
      <div className="w-2/3 flex justify-end text-sm pr-6 items-center">
        <div
          className={`px-4 ${currentPage === 1 ? 'text-secondary' : 'text-black'} cursor-pointer`}
          onClick={setFirstPage}
        >
          先頭
        </div>
        <div
          className={`px-4 ${currentPage === 1 ? 'text-secondary' : 'text-black'} cursor-pointer`}
          onClick={setPrevPage}
        >
          前
        </div>
        {currentPage > 3 && <div className="px-2">. . .</div>}
        {currentPage > 2 && (
          <div className="px-2 cursor-pointer" onClick={() => setPage(currentPage - 2)}>
            {currentPage - 2}
          </div>
        )}
        {currentPage > 1 && (
          <div className="px-2 cursor-pointer" onClick={() => setPage(currentPage - 1)}>
            {currentPage - 1}
          </div>
        )}
        <div className="px-2 h-6 w-6 flex justify-center items-center rounded-full bg-[#9e9e9e] font-bold">
          {currentPage}
        </div>
        {lastPage - currentPage > 0 && (
          <div className="px-2 cursor-pointer" onClick={() => setPage(currentPage + 1)}>
            {currentPage + 1}
          </div>
        )}
        {lastPage - currentPage > 1 && (
          <div className="px-2 cursor-pointer" onClick={() => setPage(currentPage + 2)}>
            {currentPage + 2}
          </div>
        )}
        {lastPage - currentPage > 2 && <div className="px-2">. . .</div>}
        <div
          className={`px-4 ${currentPage === lastPage ? 'text-secondary' : 'text-black'} cursor-pointer`}
          onClick={setNextPage}
        >
          次
        </div>
        <div
          className={`px-4 ${currentPage === lastPage ? 'text-secondary' : 'text-black'} cursor-pointer`}
          onClick={setLastPage}
        >
          最後
        </div>
      </div>
    </div>
  );
};
export default Pagination;

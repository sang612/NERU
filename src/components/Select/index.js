import { DownIcon } from "@/assets/icons/down";
import { CloseOutlined } from "@ant-design/icons";
import { css, cx } from "@emotion/css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Select = ({
  options,
  setValue,
  value,
  errorMessage,
  filter,
  setFilter,
  height,
  disable,
}) => {
  const [visiable, setVisiable] = useState(false);
  const selectRef = useRef(null);
  const OptionRef = useRef(null);

  const handleSelect = (option) => {
    setValue(option);
    setVisiable(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        selectRef.current &&
        OptionRef.current &&
        !selectRef.current.contains(event.target) &&
        !OptionRef.current.contains(event.target)
      ) {
        setVisiable(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef, OptionRef]);

  return (
    <>
      <div
        className={`w-full ${height ? height : "h-14 xsm:h-16"} ${
          disable && "bg-gray-100"
        } outline-none border-[1px] ${
          errorMessage && !value?.id ? "border-error" : "border-primary"
        } border-solid rounded-md shadow-sm pl-2 flex relative justify-between mb-4`}
        ref={selectRef}
      >
        <div
          className={cx(
            "h-full flex items-center",
            css`
              width: calc(100% - ${value ? "56px" : "28px"});
            `
          )}
          onClick={() => !disable && setVisiable((prev) => !prev)}
        >
          <div className="w-full truncate">{value?.name}</div>
        </div>
        {value && (
          <div className="h-full flex w-7 justify-center items-center pb-2">
            <CloseOutlined
              className="h-5 w-5 text-base text-skyBlue-300"
              onClick={() => setValue()}
            />
          </div>
        )}
        {errorMessage && !value?.id ? (
          <div className="h-full flex w-7 justify-start items-center">
            <img
              src="/assets/icons/error_down.svg"
              alt=""
              className="h-5 w-5 text-base"
              onClick={() => !disable && setVisiable((prev) => !prev)}
            />
          </div>
        ) : (
          <div className="h-full flex w-7 justify-start items-center">
            <div
              className="h-5 w-5 text-base flex items-center"
              onClick={() => !disable && setVisiable((prev) => !prev)}
            >
              <DownIcon />
            </div>
          </div>
        )}

        <div
          className={cx(
            `absolute w-full left-0 z-20 ${
              visiable ? "" : "hidden"
            } rounded-[3px] bg-white px-2 py-2 overflow-auto`,
            css`
              top: calc(100% + 10px);
              box-shadow: 0px 0px 5px 1px #888;
              max-height: 344px;
              ::-webkit-scrollbar {
                width: 6px;
                border-radius: 3px;
              }
              ::-webkit-scrollbar-track {
                background: #f1f1f1;
              }
              ::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 3px;
              }
              ::-webkit-scrollbar-thumb:hover {
                background: #666;
              }
            `
          )}
          ref={OptionRef}
        >
          <input
            className="h-12 xsm:14 w-full outline-none border-2 border-stone-400 rounded-md pl-4"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {options.length ? (
            options.map((option) => (
              <div
                onClick={() => handleSelect(option)}
                key={option.id}
                className={`h-10 ${
                  value?.id === option.id ? "" : "text-slate-400"
                } cursor-pointer leading-10 w-full truncate`}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div>No data</div>
          )}
        </div>
      </div>
      <div
        className={`${
          !(errorMessage && !value?.id) && "hidden"
        } text-eborder-error text-xs mt-[-8px] h6`}
      >
        {errorMessage}
      </div>
    </>
  );
};

export const SelectCompany = ({ setValue, value, errorMessage, height }) => {
  const [options, setOptions] = useState([]);
  const [optionsAfterFilter, setOtionsAfterFilter] = useState([]);
  const [filter, setFilter] = useState("");

  return (
    <Select
      setValue={setValue}
      value={value}
      errorMessage={errorMessage}
      options={filter ? optionsAfterFilter : options}
      filter={filter}
      setFilter={setFilter}
      height={height}
    />
  );
};
export default Select;
